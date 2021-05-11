import React from 'react'
import styled from 'styled-components'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fabric } from 'fabric-browseronly'
import { Layer, Rect, Stage } from 'react-konva'
import bg from '../images/grid.svg'
import { useDeck } from './Deck.context'
import { Layer as LayerType } from '../utilities/Types'
import ComponentRegistry, { getPropsForComponent } from '../utilities/ComponentRegistry'

const Container = styled.main`
  // background-image: url(${bg});
  // background-repeat: repeat;
  // background-size: 16px 16px;
  // background-color: white;
  height: 100%;
  overflow: scroll;
  padding: 16px;
`

const Editor = () => {
  const { project } = useDeck()

  return (
    <Container>
      {project && (
        <Stage width={720} height={1124}>
          {project?.layers?.map((layer: LayerType) => {
            return (
              <Layer key={layer.id}>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                {ComponentRegistry(project, layer)}
              </Layer>
            )
          })}
        </Stage>
      )}
    </Container>
  )
}

export default Editor
