import React, { useContext, ReactNode, useState, useEffect } from 'react'
import json5 from 'json5'
import { DeckContextProps, Project, LoadProjectProps } from '../utilities/Types'

export declare interface ActionProps {
  children: ReactNode
}

const mockProject = {
  name: 'Demo Deck',
  width: 750,
  height: 1125,
  items: [
    { id: 'layer1', type: 'Rect', x: 100, y: 100, fill: 'red', width: 50, height: 50 },
    { id: 'layer4', type: 'Rect', x: 400, y: 400, fill: 'blue', width: 50, height: 50 },
    { id: 'layer3', type: 'Image', x: 100, y: 100, path: 'art/Tornado.png' },
    {
      id: 'text1',
      type: 'Text',
      x: 0,
      y: 500,
      width: 100,
      height: 150,
      wrap: true,
      text:
        'This is a test of the text that can be super long so it should wrap naturally with the size of the text box',
    },
  ],
  cards: [{ id: 'card-id-1', name: 'Tornado', variables: { title: 'Tornado', image: 'art/Tornado.png' } }],
  path: '/Users/chris/Documents/CardStudio/demo-project/',
}

const DeckContext = React.createContext({} as DeckContextProps)

const DeckProvider = ({ children }: ActionProps) => {
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
