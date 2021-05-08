/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */

import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Header, HeaderName, HeaderContainer, Button } from 'carbon-components-react'
import { Folder32, Save32 } from '@carbon/icons-react'
import Toolbar from './Toolbar'
import Editor from './Editor'
import DetailBar from './Detailbar'
import { useDeck } from './Deck.context'
import { openFile } from './NativeUtils'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 300px;
  height: calc(100% - 48px);
  margin-top: 48px;
`

const Main = (): JSX.Element => {
  const { setProjectPath } = useDeck()

  const openProject = () => {
    openFile(setProjectPath)
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
              onClick={openProject}
            />
            <Button
              kind="secondary"
              renderIcon={Folder32}
              hasIconOnly
              iconDescription="open project"
              onClick={openProject}
            />
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
