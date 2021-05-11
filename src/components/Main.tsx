/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */

import React from 'react'
import styled from 'styled-components'
import { Header, HeaderName, HeaderContainer, Button } from 'carbon-components-react'
import { Folder32, Save32, Export32 } from '@carbon/icons-react'
import Toolbar from './Toolbar'
import Editor from './Editor'
import DetailBar from './Detailbar'
import { useDeck } from './Deck.context'
import { openProject } from '../utilities/NativeUtils'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 300px;
  //height: calc(100% - 48px);
  //margin-top: 3rem;
  margin-top: 3rem;
  height: calc(100vh - 3rem);
`

const Main = (): JSX.Element => {
  const { loadProject } = useDeck()

  const onSaveProject = () => {
    // TODO
    console.log('Saving Project')
  }

  const onOpenProject = () => {
    openProject(loadProject)
  }

  const onExportDeck = () => {
    // TODO
    console.log('Exporting deck')
  }

  return (
    <>
      <HeaderContainer
        render={() => (
          <Header aria-label="Card Studio">
            <HeaderName href="#" prefix="">
              Card Studio
            </HeaderName>
            <Button
              kind="secondary"
              renderIcon={Save32}
              hasIconOnly
              iconDescription="save project"
              onClick={onSaveProject}
            />
            <Button
              kind="secondary"
              renderIcon={Folder32}
              hasIconOnly
              iconDescription="open project"
              onClick={onOpenProject}
            />
            <Button kind="secondary" onClick={onExportDeck} renderIcon={Export32}>
              Generate Deck
            </Button>
          </Header>
        )}
      />
      <Grid>
        <Toolbar />
        <Editor />
        <DetailBar />
      </Grid>
    </>
  )
}

Main.displayName = 'Main'

export default Main
