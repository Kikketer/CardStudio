/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */

export declare interface OpenCallback {
  name: string
  path: string
  content: string
}

export declare interface LoadProjectProps {
  path: string
  name: string
  content: string
}

export declare interface DeckContextProps {
  project?: Project
  zoomFactor: number
  setZoomFactor: (factor: number) => void
  loadProject: (project: LoadProjectProps) => void
  selectedItemId: string | undefined
  setSelectedItemId: (itemId: string | undefined) => void
}

export declare interface EditorContextProps {
  isEditingMaster: boolean
  setIsEditingMaster: (T: boolean) => void
  showGuides: boolean
  setShowGuides: (T: boolean) => void
  scale: number
  setScale: (T: number) => void
}

export declare interface Item {
  id: string
  type: string
  name?: string
  left?: number
  top?: number
  fill?: string
  width?: number
  height?: number
}

export declare interface Card {
  id: string
  name: string
  variables?: { [key: string]: string | number | boolean }
}

export declare interface Project {
  name: string
  path: string
  width: number
  height: number
  items?: Array<Item>
  cards?: Array<Card>
}
