/**
 * App.tsx
 * App component for extension options page.
 */

// Node Modules
import { FC } from 'react';
import { MemoryRouter as Router, Link, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

// Components
import SettingsPage from './settings/components/SettingsPage';

// Config
import {THEME} from 'config';

// Styled Components
const StyledNav = styled.nav`
  background-color: ${({theme}) => theme.color.primary};

  ul {
    display: flex;
    list-style: none;
    margin: 0px;
    padding: 0px;
  }
`;

const Home: FC = () => (
  <div>
    Home
  </div>
);

const App: FC = () => (
  <ThemeProvider theme={THEME}>
    <Router>
      <StyledNav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/settings/speech">Settings</Link>
          </li>
        </ul>
      </StyledNav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/settings" component={SettingsPage} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
