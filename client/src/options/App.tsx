/**
 * App.tsx
 * App component for extension options page.
 */

// Node Modules
import { MemoryHistory } from 'history';
import { FC } from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Components
import Navbar from './router/components/Navbar';
import SettingsPage from './settings/components/SettingsPage';

// Config
import {THEME} from 'config';

// Utils
const getPartialMemoryHistory = (): Partial<MemoryHistory> => {
  const partialMemoryHistory = sessionStorage.getItem('partial_memory_history');

  if (partialMemoryHistory) {
    return JSON.parse(partialMemoryHistory);
  }

  return {
    entries: undefined,
    index: undefined,
  };
}

const Home: FC = () => (
  <div>
    Home
  </div>
);

const App: FC = () => {
  const partialMemoryHistory = getPartialMemoryHistory();

  return (
    <ThemeProvider theme={THEME}>
      <Router
        initialEntries={partialMemoryHistory.entries}
        initialIndex={partialMemoryHistory.index}
      >
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/settings" component={SettingsPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
