import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
// import { fabric } from 'fabric-browseronly'
// import Konva from 'konva'
import { Stage, Rect, Layer } from 'react-konva'
import bg from '../images/grid.svg'
import { useDeck } from './Deck.context'
import { Layer as LayerType } from '../utilities/Types'
import ComponentRegistry from '../utilities/ComponentRegistry'
import Image from './Image'
import deckImage from '../images/usgamedeck.png'
import { useEditor } from './Editor.context'
import TransformableLayer from './TransformableLayer'

const Container = styled.main`
  background-image: url(${bg});
  background-repeat: repeat;
  background-size: 16px 16px;
  background-color: white;
  height: 100%;
  overflow: scroll;
  padding: 16px;
`

const WhiteCardStage = styled(Stage)`
  background: white;
  display: inline-block;
`

const Editor = () => {
  const { showGuides, scale } = useEditor()
  const { project } = useDeck()

  const size = {
    width: 750 * scale,
    height: 1125 * scale,
  }

  return (
    <Container>
      {project && (
        <WhiteCardStage width={size.width} height={size.height} scale={{ x: scale, y: scale }}>
          <Layer>{showGuides && <Image url={deckImage} draggable={false} />}</Layer>
          {project?.layers?.map((layer: LayerType) => {
            return <TransformableLayer key={layer.id}>{ComponentRegistry(project, layer)}</TransformableLayer>
          })}
        </WhiteCardStage>
      )}
    </Container>
  )
}

export default Editor
