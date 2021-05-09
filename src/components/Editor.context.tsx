/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */

import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react'
import { fabric } from 'fabric-browseronly'
import { EditorContextProps } from './Types'

type EditorBase = {
  children: ReactNode
  canvas: fabric.Canvas
}

const EditorContext = createContext<EditorContextProps | null>(null)

const EditorProvider = ({ children, canvas }: EditorBase): JSX.Element => {
  const [isEditingMaster, setIsEditingMaster] = useState<boolean>(false)
  const [activeLayer, setActiveLayer] = useState<Layer | undefined>()

  useEffect(() => {
    console.log('Layer changed ', activeLayer)
    if (activeLayer) {
      // TODO...
    }
  }, [activeLayer])

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
