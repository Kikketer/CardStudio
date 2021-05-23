import React, { useContext, ReactNode, useState, useEffect } from 'react'
import json5 from 'json5'
import { DeckContextProps, Project, LoadProjectProps } from '../utilities/Types'

export declare interface ActionProps {
  children: ReactNode
}

const mockProject = {
  name: 'Mock Project',
  path: '', // This is normally injected
  items: [
    {
      id: 'layer1',
      type: 'Rect',
      left: 100,
      top: 100,
      fill: 'red',
      width: 50,
      height: 50,
    },
  ],
}

const DeckContext = React.createContext({} as DeckContextProps)

const DeckProvider = ({ children }: ActionProps) => {
  // const canvas = useRef<fabric.Canvas | undefined>()
  const [zoomFactor, setZoomFactor] = useState(0.5)
  const [project, setProject] = useState<Project | undefined>(mockProject)
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(undefined)

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
    <DeckContext.Provider
      value={{ project, zoomFactor, setZoomFactor, loadProject, selectedItemId, setSelectedItemId }}
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
