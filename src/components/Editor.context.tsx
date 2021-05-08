/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */

import React, { createContext, ReactNode, useContext, useState } from 'react'

type EditorBase = {
  children: ReactNode
}

type EditorContextProps = {
  isEditingMaster: boolean
  setIsEditingMaster: (T: boolean) => void
}

const EditorContext = createContext<EditorContextProps | null>(null)

const EditorProvider = ({ children }: EditorBase): JSX.Element => {
  const [isEditingMaster, setIsEditingMaster] = useState<boolean>(false)

  return <EditorContext.Provider value={{ isEditingMaster, setIsEditingMaster }}>{children}</EditorContext.Provider>
}

const useEditor = (): EditorContextProps => {
  const context = useContext(EditorContext)
  if (!context) throw new Error('useEditor.context must be used within a Editor.contextProvider')
  return context
}

EditorProvider.displayName = 'Editor.contextProvider'

export { useEditor, EditorProvider }
