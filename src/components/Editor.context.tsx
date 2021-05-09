/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */

import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import { EditorContextProps } from './Types'
import { useDeck } from './Deck.context'

type EditorBase = {
  children: ReactNode
}

const EditorContext = createContext<EditorContextProps | null>(null)

const EditorProvider = ({ children }: EditorBase): JSX.Element => {
  const [isEditingMaster, setIsEditingMaster] = useState<boolean>(true)
  const [activeLayer, setActiveLayer] = useState<Layer | undefined>()

  useEffect(() => {
    console.log('Layer changed ', activeLayer)
    if (activeLayer) {
      // TODO...
    }
  }, [activeLayer])

  const setActiveLayerById = (id: string) => {}

  return (
    <EditorContext.Provider value={{ isEditingMaster, setIsEditingMaster, activeLayer, setActiveLayer }}>
      {children}
    </EditorContext.Provider>
  )
}

const useEditor = (): EditorContextProps => {
  const context = useContext(EditorContext)
  if (!context) throw new Error('useEditor.context must be used within a Editor.contextProvider')
  return context
}

EditorProvider.displayName = 'Editor.contextProvider'

export { useEditor, EditorProvider }
