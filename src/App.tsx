import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'
// import Editor from './components/Editor'
// import Toolbar from './components/Toolbar'
// import Detailbar from './components/Detailbar'
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderContainer,
  SideNav,
  SideNavItems,
  SideNavMenu,
  SideNavMenuItem,
  SideNavLink,
} from 'carbon-components-react'
import { Cursor_132, Search20, Fade16, Notification20, AppSwitcher20 } from '@carbon/icons-react'
import { DeckProvider } from './components/Deck.context'
import './app.scss'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr 300px;
  height: 100%;
`

const Frame = () => {
  return (
    <DeckProvider>
      <HeaderContainer
        render={() => (
          <Header aria-label="Card Studio">
            <HeaderName href="#" prefix="Card">
              [Studio]
            </HeaderName>
            <HeaderGlobalBar>
              <HeaderGlobalAction aria-label="Search" onClick={() => console.log('search click')}>
                <Search20 />
              </HeaderGlobalAction>
              <HeaderGlobalAction aria-label="Notifications" onClick={() => console.log('notification click')}>
                <Notification20 />
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="App Switcher"
                onClick={() => console.log('app-switcher click')}
                tooltipAlignment="end"
              >
                <AppSwitcher20 />
              </HeaderGlobalAction>
            </HeaderGlobalBar>
          </Header>
        )}
      />
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
