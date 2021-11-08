/**
 * App.tsx
 * App component for extension options page.
 */

// Node Modules
import { FC } from 'react';
import {
  MemoryRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

// Components
import Navbar from './router/components/Navbar';
import SettingsPage from './settings/components/SettingsPage';
import VoicesPage from './voice/components/Page';

// Config
import {THEME} from 'config';

const getInitialEntries = () => {
  const value = sessionStorage.getItem('memory_router_initial_entries');
  const initialEntries = JSON.parse(value);
  return Array.isArray(initialEntries) ? initialEntries : undefined;
};

const Home = () => <p>Home</p>

const App: FC = () => {
  return (
    <ThemeProvider theme={THEME}>
      <Router initialEntries={getInitialEntries()}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/voices" element={<VoicesPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
