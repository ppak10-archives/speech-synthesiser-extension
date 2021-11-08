/**
 * Navbar.tsx
 * Navbar component overlayed on top or bottom of current page.
 */

// Node Modules
import { FC } from 'react';
import styled from 'styled-components';

// Actions
import { setEditorStatus } from 'content/selection/actions';

// Enums
import { SelectionEditorStatus } from 'content/selection/enums';

// Hooks
import { useAppDispatch, useAppSelector } from 'content/hooks';

// Styled Components
const StyledNavbar = styled.nav`
  bottom: 0px;
  position: fixed;
  right: 0px;
  width: 100%;
`;

const Navbar: FC = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const editorStatus = useAppSelector(({ selection }) => selection.editorStatus);

  // Callbacks
  const handleSelect = () => {
    dispatch(setEditorStatus(SelectionEditorStatus.Selecting));
  };

  return (
    <StyledNavbar>
      <button>Read</button>
      <button onClick={handleSelect}>
        {editorStatus === SelectionEditorStatus.Selecting ? 'Selecting' : 'Select' }
      </button>
      <button>Settings</button>
    </StyledNavbar>
  );
};

export default Navbar;
