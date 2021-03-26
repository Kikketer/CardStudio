import React, { useContext, ReactNode, useState, useRef, useEffect } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fabric } from 'fabric-browseronly'
import cardOverlay from '../images/usgamedeck.png'

export declare interface ActionProps {
  children: ReactNode
}

export declare interface DeckContextProps {
  layers: Layer[]
  canvas: fabric.Canvas | null
  zoomFactor: number
}

const DeckContext = React.createContext({} as DeckContextProps)

const DeckProvider = ({ children }: ActionProps) => {
  const canvas = useRef<fabric.Canvas>(
    new fabric.Canvas('the-card', {
      margin: 'auto',
      backgroundColor: 'white',
    })
  )
  // TODO this is the layer where we will hold onto the deck information
  const [layers, setLayers] = useState<Layer[]>([])
  const [zoomFactor, setZoomFactor] = useState(0.5)

  useEffect(() => {
    // Setup the canvas
    // TODO unload and rerender when card changes
  }, [])

  useEffect(() => {
    canvas.current.setWidth(750 * zoomFactor)
    canvas.current.setHeight(1125 * zoomFactor)
    canvas.current.setBackgroundImage(cardOverlay, () => canvas.current.renderAll())
    canvas.current.setZoom(zoomFactor)
  }, [zoomFactor])

  return <DeckContext.Provider value={{ layers, canvas: canvas.current, zoomFactor }}>{children}</DeckContext.Provider>
}

const useDeck = (): DeckContextProps => {
  const context = useContext(DeckContext)
  if (!context) throw new Error('useDeck must be used within a DeckProvider')
  return context
}

DeckProvider.displayName = 'StoreProvider'

export { DeckProvider, useDeck }
