/**
 * Modal.tsx
 * Modal component utilizing portal.
 */

// Node Modules
import { string } from 'prop-types';
import { FC } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

// Components
const ModalPortal = ({ children }) =>
  createPortal(children, document.getElementById('modal-root'));

// Styled Components
export const StyledModalOverlay = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.75);
  bottom: 0px;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0px;
  width: 100%;
`;

export const StyledModal = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 500px;
  justify-content: center;
  width: 500px;
`;

// Types
interface ModalProps {
  className?: string;
}

const Modal: FC<ModalProps> = ({ children, className }) => (
  <ModalPortal>
    <StyledModalOverlay>
      <StyledModal className={className}>
        {children}
      </StyledModal>
    </StyledModalOverlay>
  </ModalPortal>
);

export default Modal;

Modal.propTypes = {
  className: string,
};
