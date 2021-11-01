/**
 * Background.tsx
 * Background component provided to indicate selection element.
 */

// Node Modules
import styled from 'styled-components';

// Styled Components
export const StyledBackground = styled.div.attrs(({ style }) => ({
  style,
}))`
  background-color: rgba(0, 0, 0, 0.1);

  /**
   * Uses pointer-events as none here to handle proper hovering of content using
   * document wide 'mouseover' event listener.
   */
  pointer-events: none;

  position: absolute;
  transition: 250ms;
  z-index: 99999999;
`;
