import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import { Provider as SpectrumProvider, defaultTheme } from '@adobe/react-spectrum'
import Editor from './components/Editor'
import Toolbar from './components/Toolbar'
import Detailbar from './components/Detailbar'
import { DeckProvider } from './components/Deck.context'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 300px;
  height: 100%;
`

const Frame = () => {
  return (
    <SpectrumProvider theme={defaultTheme}>
      <DeckProvider>
        <Grid>
          <Toolbar />
          <Editor />
          <Detailbar />
        </Grid>
      </DeckProvider>
    </SpectrumProvider>
  )
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Frame} />
      </Switch>
    </Router>
  )
}
