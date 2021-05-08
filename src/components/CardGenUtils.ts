/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */
import { fabric } from 'fabric-browseronly'
import { forEach, reverse, clone } from 'lodash'
import { Layer, Project } from './Types'

export const drawCard = (project: Project, canvas: fabric.Canvas): void => {
  if (!project) return

  const reversedLayers = reverse(clone(project.layers))

  forEach(reversedLayers, (layer: Layer) => {
    const { type, path, ...options } = layer
    // Images are different...
    console.log('rendering layer ', type)
    if (type.match(/^image$/i)) {
      console.log('Rendering image ', options)
      // fabric.Image.fromURL(
      //   `file://${project.path}${options.path}`,
      //   (oImg: any) => {
      //     canvas.add(oImg)
      //     canvas.renderAll()
      //   },
      //   options
      // )
    } else {
      const thing = new fabric[type](options)
      canvas.add(thing)
    }
  })
}

export const AddRect = (project: Project, canvas: fabric.Canvas) => {
  // TODO
}

export const AddText = (project: Project, canvas: fabric.Canvas) => {}

/**
 * Fetch and add the image to the canvas, this will resolve when it's fully loaded and added
 *
 * @param canvas - The canvas to add the image to
 * @returns Promise<void>
 */
const addImage = (projectPath: string, imagePath: string, canvas: fabric.Canvas, options: Layer) => {
  return new Promise((resolve, reject) => {
    fabric.Image.fromURL(
      `file://${projectPath}${imagePath}`,
      (oImg: any) => {
        canvas.add(oImg)
        canvas.renderAll()
      },
      options
    )
  })
}
