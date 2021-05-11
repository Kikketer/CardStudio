/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */
import React from 'react'
import { Rect } from 'react-konva'
import Image from '../components/Image'
import { Layer, Project } from './Types'

type ComponentMapType = {
  [T: string]: any
}

const componentMap: ComponentMapType = {
  Image,
  Rect,
}

const getPropsForComponent = (project: Project, layer: Layer) => {
  // TODO make this part of each component (maybe?)
  switch (layer.type) {
    case 'Rect':
      return {
        x: layer.left,
        y: layer.top,
        width: layer.width,
        height: layer.height,
        fill: layer.fill,
      }
    case 'Image':
      return {
        x: layer.left,
        y: layer.top,
        url: `file://${project.path}${layer.path}`,
      }
    default:
      return {
        x: layer.left,
        y: layer.top,
      }
  }
}

const Component = (project: Project, layer: Layer) => {
  const Comp = componentMap[layer.type]
  const props = getPropsForComponent(project, layer)
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Comp {...props} />
}

Component.displayName = 'Component'

export default Component
