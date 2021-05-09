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
  layers: Layer[]
  canvas: fabric.Canvas | null
  zoomFactor: number
  loadProject: (T: LoadProjectProps) => void
  project?: Project
}

export declare interface EditorContextProps {
  isEditingMaster: boolean
  setIsEditingMaster: (T: boolean) => void
  activeLayer: Layer | undefined
  setActiveLayer: (T: Layer) => void
}

export declare interface Layer {
  id: string
  type: string
  name?: string
  left?: number
  top?: number
  fill?: string
  width?: number
  height?: number
  path?: string
}

export declare interface LayerItem {
  layer: Layer
  active?: boolean
  onClick?: (T: Layer) => void
}

export declare interface Project {
  name: string
  path: string
  layers?: Array<Layer>
}
