/**
 * Navbar.tsx
 * Navbar component for providing links for routing.
 */

// Node Modules
import { MemoryHistory } from 'history';
import { FC, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const StyledNavbar = styled.nav`
  background-color: ${({theme}) => theme.color.primary};

  ul {
    display: flex;
  }
`;

const Navbar: FC = () => {
  // Hooks
  const history = useHistory() as MemoryHistory;

  useEffect(() => {
    // Only called once as history is mutable.
    const handleRouteChange = () => {
      const partialMemoryHistory: Partial<MemoryHistory> = {
        entries: history.entries,
        index: history.index,
      };

      sessionStorage.setItem(
        'partial_memory_history',
        JSON.stringify(partialMemoryHistory),
      );

    };

    history.listen(handleRouteChange);
  }, [history]);

  return (
    <StyledNavbar>
      <ul>
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
