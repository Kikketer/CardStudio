import React, { useContext, ReactNode, useState, useRef, useEffect } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fabric } from 'fabric-browseronly'
import json5 from 'json5'
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
    })

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

  return (
    <DeckContext.Provider value={{ project, zoomFactor, setZoomFactor, loadProject }}>{children}</DeckContext.Provider>
  )
}

const useDeck = (): DeckContextProps => {
  const context = useContext(DeckContext)
  if (!context) throw new Error('useDeck must be used within a DeckProvider')
  return context
}

DeckProvider.displayName = 'StoreProvider'

export { DeckProvider, useDeck }
