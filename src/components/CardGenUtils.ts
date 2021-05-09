/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */
import { fabric } from 'fabric-browseronly'
import { reverse, clone, map } from 'lodash'
import pSeries from 'p-series'
import { Layer, Project } from './Types'
import { SUPPORTED_TYPES } from './constants'
import cardOverlay from '../images/usgamedeck.png'

const selectOptions = {
  borderColor: 'purple',
  cornerColor: 'purple',
  transparentCorners: false,
}

/**
 * Fetch and add the image to the canvas, this will resolve when it's fully loaded and added
 *
 * @param canvas - The canvas to add the image to
 * @returns Promise<void>
 */
const addImage = (projectPath: string, imagePath?: string, canvas?: fabric.Canvas, options?: Layer) => {
  if (!projectPath || !imagePath) return Promise.resolve()

  return new Promise((resolve: () => void) => {
    fabric.Image.fromURL(
      `file://${projectPath}${imagePath}`,
      (oImg: any) => {
        resolve(canvas.add(oImg))
      },
      { ...selectOptions, ...options }
    )
  })
}

const drawCard = async (project: Project | undefined, canvas: fabric.Canvas | undefined): void => {
  if (!project || !canvas) return
  console.log('drawing card')

  // We render from the bottom up (so layers on the top of the array are on top)
  const reversedLayers = reverse(clone(project.layers))

  canvas.clear()
  canvas.setBackgroundColor('white')
  canvas.setBackgroundImage(cardOverlay)

  await pSeries(
    map(reversedLayers, (layer: Layer) => {
      const { type, path, ...options } = layer
      if (!SUPPORTED_TYPES[type]) {
        console.warn(`Unsupported type: ${type}`)
        return () => {}
      }
      // Images are different...
      if (type.match(/^image$/i)) {
        return () => addImage(project.path, path, canvas, layer)
      }

      const thing = new fabric[type]({ ...selectOptions, ...options })
      return () => canvas.add(thing)
    })
  )

  // Finally re-render it all (maybe?)
  // canvas.renderAll()
}

// eslint-disable-next-line import/prefer-default-export
export { drawCard }
