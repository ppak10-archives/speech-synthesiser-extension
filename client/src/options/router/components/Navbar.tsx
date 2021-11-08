/**
 * Navbar.tsx
 * Navbar component for providing links for routing.
 */

// Node Modules
import { FC, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const StyledNavbar = styled.nav`
  background-color: ${({theme}) => theme.color.primary};
  display: flex;
  flex-direction: column;
  grid-area: navbar;
`;

const Navbar: FC = () => {
  // Hooks
  const location = useLocation();

  useEffect(() => {
    // Currently saves only the last visited location.
    sessionStorage.setItem(
      'memory_router_initial_entries',
      JSON.stringify([location.pathname])
    );
  }, [location]);

  return (
    <StyledNavbar>
      <ul>
        <li>
          <Link to="/voices">Voices</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/settings/speech">Settings</Link>
        </li>
      </ul>
    </StyledNavbar>
  );
}

export default Navbar;
