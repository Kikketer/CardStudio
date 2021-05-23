/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */
import React, { useEffect, useRef } from 'react'
import { Rect, Transformer } from 'react-konva'
import Image from '../components/Image'
import { Item, Project } from './Types'

type ComponentMapType = {
  [T: string]: any
}

type ComponentOptions = {
  isSelected: boolean
  onSelect: (id: string) => void
}

const commonProps = {
  draggable: true,
}

const componentMap: ComponentMapType = {
  Image,
  Rect,
}

const getPropsForComponent = (project: Project, item: Item) => {
  // TODO make this part of each component (maybe?)
  switch (item.type) {
    case 'Rect':
      return {
        x: item.left,
        y: item.top,
        width: item.width,
        height: item.height,
        fill: item.fill,
      }
    case 'Image':
      return {
        x: item.left,
        y: item.top,
        url: `file://${project.path}${item.path}`,
      }
    default:
      return {
        x: item.left,
        y: item.top,
      }
  }
}

const Component = (project: Project, item: Item, { onSelect, isSelected }: ComponentOptions) => {
  const Comp = componentMap[item.type]
  const props = getPropsForComponent(project, item)
  const itemRef = useRef<any>()
  const transformerRef = useRef<any>()

  const innerOnSelect = (e: any) => {
    onSelect(e.target.id())
  }

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      transformerRef.current.nodes([itemRef.current])
      transformerRef.current.getLayer().batchDraw()
    }
  }, [isSelected])

  return (
    <>
      <Comp
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...commonProps}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        id={item.id}
        ref={itemRef}
        onClick={innerOnSelect}
        onTap={innerOnSelect}
        isSelected={isSelected}
      />
      {isSelected && <Transformer ref={transformerRef} />}
    </>
  )
}

Component.displayName = 'Component'

export default Component
