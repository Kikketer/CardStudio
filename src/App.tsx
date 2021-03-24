import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
import Editor from './components/Editor'
import Toolbar from './components/Toolbar'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  height: 100%;
`

const Frame = () => {
  return (
    <Grid>
      <Editor />
      <Toolbar />
    </Grid>
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
