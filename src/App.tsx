import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { DeckProvider } from './components/Deck.context'
import './app.scss'
import Main from './components/Main'

const Frame = () => {
  return (
    <DeckProvider>
      <Main />
    </DeckProvider>
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
