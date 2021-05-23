import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Stage, Layer } from 'react-konva'
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
  const { project, selectedItemId, setSelectedItemId } = useDeck()

  const size = {
    width: 750 * scale,
    height: 1125 * scale,
  }

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage()
    if (clickedOnEmpty) {
      setSelectedItemId(undefined)
    }
  }

  // TS + Events is total BS (MouseEvent?)
  const onClickBackdrop = (e: any) => {
    if (e.target?.dataset?.type === 'backdrop') {
      setSelectedItemId(undefined)
    }
  }

  const onClickTemplate = () => {
    onClickBackdrop({ target: { dataset: { type: 'backdrop' } } })
  }

  return (
    <Container data-type="backdrop" onClick={onClickBackdrop}>
      <p>Selected: {selectedItemId}</p>
      {project && (
        <WhiteCardStage
          width={size.width}
          height={size.height}
          scale={{ x: scale, y: scale }}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            {showGuides && (
              <Image onClick={onClickTemplate} onTap={onClickTemplate} url={deckImage} draggable={false} />
            )}
          </Layer>
          {project?.items?.map((item: LayerType) => {
            return (
              <Layer key={item.id}>
                {ComponentRegistry(project, item, {
                  onSelect: setSelectedItemId,
                  isSelected: item.id === selectedItemId,
                })}
              </Layer>
            )
          })}
        </WhiteCardStage>
      )}
    </Container>
  )
}

export default Editor
