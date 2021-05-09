import React, { useContext, ReactNode, useState, useRef, useEffect } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fabric } from 'fabric-browseronly'
import json5 from 'json5'
import { find } from 'lodash'
import { IEvent } from 'fabric/fabric-impl'
import { DeckContextProps, Project, LoadProjectProps } from './Types'
import { drawCard } from './CardGenUtils'

export declare interface ActionProps {
  children: ReactNode
}

const DeckContext = React.createContext({} as DeckContextProps)

const DeckProvider = ({ children }: ActionProps) => {
  const canvas = useRef<fabric.Canvas | undefined>()
  const [zoomFactor, setZoomFactor] = useState(0.5)
  const [project, setProject] = useState<Project | undefined>()

  useEffect(() => {
    canvas.current = new fabric.Canvas('the-card', {
      margin: 'auto',
      backgroundColor: 'white',
      preserveObjectStacking: true,
      height: 1124 * zoomFactor,
      width: 750 * zoomFactor,
      // "selection" is for dragging a select box
      selectionLineWidth: 1,
      selectionBorderColor: '#ff00ff',
    })

    canvas.current.on('selection:created', (c: IEvent) => console.log('selection created---', c.target))
    canvas.current.on('selection:updated', (c: IEvent) => console.log('selection updated---', c.target))
    canvas.current.on('selection:cleared', (c: IEvent) => console.log('selection cleared---', c.target))
    canvas.current.on('object:modified', (c: IEvent) => console.log('object updated---', c.target))

    // TODO set zoomFactor in a different useEffect
    canvas.current.setZoom(zoomFactor)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (project) {
      drawCard(project, canvas.current)
    }
  }, [project])

  useEffect(() => {
    // TODO
  }, [zoomFactor])

  const loadProject = ({ path, content }: LoadProjectProps) => {
    setProject(undefined)

    if (!path || !content) return

    const p: Project = json5.parse(content)
    p.path = path
    setProject(p)
  }

  const selectLayerById = (id: string) => {
    console.log('selecting layer ', id)
    // const foundObject = find(canvas.current.getObjects(), { id })
    const foundObject = canvas.current.getObjects().find((obj: any) => obj.id === id)
    if (foundObject) {
      // TODO Figure out why it won't show the selection: https://jsfiddle.net/Kikketer/ncgs784p/
      // It's even firing the event...
      canvas.current.setActiveObject(foundObject)
      // discardActiveObject() << to deselect
    }
  }

  return (
    <DeckContext.Provider value={{ project, zoomFactor, setZoomFactor, loadProject, selectLayerById }}>
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
