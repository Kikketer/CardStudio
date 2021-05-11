import React, { useContext, ReactNode, useState, useRef, useEffect } from 'react'
import { fabric } from 'fabric-browseronly'
import json5 from 'json5'
import { find, cloneDeep, map } from 'lodash'
import { IEvent } from 'fabric/fabric-impl'
import { drawCard } from '../utilities/CardGenUtils'
import { DeckContextProps, Project, LoadProjectProps, Layer } from '../utilities/Types'

export declare interface ActionProps {
  children: ReactNode
}

const DeckContext = React.createContext({} as DeckContextProps)

const DeckProvider = ({ children }: ActionProps) => {
  // const canvas = useRef<fabric.Canvas | undefined>()
  const [zoomFactor, setZoomFactor] = useState(0.5)
  const [project, setProject] = useState<Project | undefined>()
  const [currentLayerId, setCurrentLayerId] = useState<string | undefined>(undefined)

  // const onUpdateLayer = (event: any, p?: Project) => {
  //   const layerObject = event.target
  //   console.log('object updated---', layerObject, project, p)
  //   const modifiedId: string = layerObject?.id || ''
  //   const layers: Array<Layer> = map(cloneDeep(project?.layers || []), (layer: Layer) => {
  //     if (layer.id === modifiedId) {
  //       return {}
  //     }
  //     return layer
  //   })
  //
  //   const resultingProject: Project = { ...project, layers }
  //   console.log('Result? ', resultingProject)
  //   // setProject(resultingProject)
  // }

  // useEffect(() => {
  //   canvas.current = new fabric.Canvas('the-card', {
  //     margin: 'auto',
  //     backgroundColor: 'white',
  //     preserveObjectStacking: true,
  //     height: 1124 * zoomFactor,
  //     width: 750 * zoomFactor,
  //     // "selection" is for dragging a select box
  //     selectionLineWidth: 1,
  //     selectionBorderColor: '#ff00ff',
  //   })
  //
  //   canvas.current.on('selection:created', (c: IEvent) => console.log('selection created---', c.target))
  //   canvas.current.on('selection:updated', (c: IEvent) => console.log('selection updated---', c.target))
  //   canvas.current.on('selection:cleared', (c: IEvent) => console.log('selection cleared---', c.target))
  //   canvas.current.on('object:modified', (e: IEvent) => onUpdateLayer(e, project))
  //
  //   // TODO set zoomFactor in a different useEffect
  //   canvas.current.setZoom(zoomFactor)
  //
  //   // eslint-disable-next-line
  // }, [])

  useEffect(() => {
    // TODO
  }, [zoomFactor])

  // useEffect(() => {
  //   console.log('Current Layer ID changed ', currentLayerId)
  //   if (currentLayerId) {
  //     const foundObject = find(canvas.current.getObjects(), { id: currentLayerId })
  //     canvas.current.setActiveObject(foundObject)
  //   } else {
  //     canvas.current.discardActiveObject()
  //   }
  // }, [currentLayerId])

  const loadProject = ({ path, content }: LoadProjectProps) => {
    setProject(undefined)

    if (!path || !content) return

    const p: Project = json5.parse(content)
    p.path = path
    setProject(p)

    // drawCard(p, canvas.current)
  }

  return (
    <DeckContext.Provider
      value={{ project, zoomFactor, setZoomFactor, loadProject, currentLayerId, setCurrentLayerId }}
    >
      {children}
    </DeckContext.Provider>
  )
}

const useDeck = (): DeckContextProps => {
  const context = useContext(DeckContext)
  if (!context) throw new Error('useDeck must be used within a DeckProvider')
  return context
}

DeckProvider.displayName = 'StoreProvider'

export { DeckProvider, useDeck }
