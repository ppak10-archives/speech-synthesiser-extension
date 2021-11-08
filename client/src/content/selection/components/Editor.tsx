/**
 * Editor.tsx
 * Selection editor for selecting elements and text to synthesize.
 */

// Node Modules
import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// Actions
import { setEditorStatus } from '../actions';

// Constants
const BORDER_RADIUS = '2px';

// Enums
import { SelectionEditorStatus } from '../enums';

// Hooks
import { useAppDispatch, useAppSelector } from 'content/hooks';

// Styled Components
import { StyledBackground } from './Background';
const StyledCancelButton = styled.button`
  background-color: red;
  border-radius: ${BORDER_RADIUS};
  pointer-events: all;
  position: absolute;
  top: 0px;
  right: 0px;
`;

// Utils
import { NodeSelection } from '../utils';

const nodeSelectionHover = new NodeSelection('speakeasy-hover-text');
const nodeSelectionActive = new NodeSelection('speakeasy-text-insert');

const createOutlineHoverStyles = (target: HTMLElement): CSSProperties => {
  const computedStyle = window.getComputedStyle(target);

  // Applies all values in computed styles if any are not '0px'
  const hasRadius = [
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius',
  ].find((key) => computedStyle[key] !== '0px');

  const clientRect = target.getBoundingClientRect();

  return {
    // Border styles
    borderBottomLeftRadius: hasRadius ? computedStyle.borderBottomLeftRadius : BORDER_RADIUS,
    borderBottomRightRadius: hasRadius ? computedStyle.borderBottomRightRadius : BORDER_RADIUS,
    borderTopLeftRadius: hasRadius ? computedStyle.borderTopLeftRadius : BORDER_RADIUS,
    borderTopRightRadius: hasRadius ? computedStyle.borderTopRightRadius : BORDER_RADIUS,

    // Styles associated with positioning  (`scrollX` & `scrollY`)
    // https://javascript.info/coordinates#getCoords
    bottom: clientRect.bottom + window.scrollY,
    height: clientRect.height,
    left: clientRect.left + window.scrollX,
    right: clientRect.right + window.scrollX,
    top: clientRect.top + window.scrollY,
    width: clientRect.width,
  };
};

const Editor: FC = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const activeDomNodeRef = useRef(null);
  const hoverDomNodeRef = useRef(null);
  const editorStatus = useAppSelector(({ selection }) => selection.editorStatus);

  const [backgroundActiveStyle, setBackgroundActiveStyle] = useState<CSSProperties>({
    borderBottomLeftRadius: null,
    borderBottomRightRadius: null,
    borderTopLeftRadius: null,
    borderTopRightRadius: null,
    bottom: null,
    height: null,
    left: null,
    right: null,
    top: null,
    width: null,
  });

  const [backgroundHoverStyle, setBackgroundHoverStyle] = useState<CSSProperties>({
    borderBottomLeftRadius: null,
    borderBottomRightRadius: null,
    borderTopLeftRadius: null,
    borderTopRightRadius: null,
    bottom: null,
    height: null,
    left: null,
    right: null,
    top: null,
    width: null,
  });

  // Callbacks
  const handleCancelButonClick = () => {
    dispatch(setEditorStatus(SelectionEditorStatus.Selecting));
    nodeSelectionActive.unstyle(activeDomNodeRef.current);
  };

  useEffect(() => {

    const handleMouseOver = (e: MouseEvent) => {
      if (editorStatus === SelectionEditorStatus.Selecting) {

        nodeSelectionHover.unstyle(e.relatedTarget);

        nodeSelectionHover.style(e.target)
        hoverDomNodeRef.current = e.target;

        // Sets absolute position for background hover.
        setBackgroundHoverStyle(createOutlineHoverStyles(e.target as HTMLElement));
      }
    };

    const handleClick = (e: MouseEvent) => {
      switch (editorStatus) {
        case SelectionEditorStatus.Selecting:
          // Prevents elements like links from redirecting and some buttons.
          // Doesn't seem to catch events from <svg />.
          e.preventDefault();

          nodeSelectionActive.unstyle(activeDomNodeRef.current);
          nodeSelectionHover.unstyle(e.target);

          nodeSelectionActive.style(e.target);
          activeDomNodeRef.current = e.target;
          setBackgroundActiveStyle(createOutlineHoverStyles(e.target as HTMLElement));
          dispatch(setEditorStatus(SelectionEditorStatus.Editing));
          break;

        case SelectionEditorStatus.Editing:

      }
    }

    document.addEventListener('click', handleClick);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [dispatch, editorStatus]);

  useEffect(() => {
    // Attaches event listener to actual active dom node ref to only listen to
    // mouse clicks inside this element.
    if (activeDomNodeRef.current) {
      const handleClick = (e: MouseEvent) => {
        switch (editorStatus) {
          case SelectionEditorStatus.Editing:
            // Prevents elements like links from redirecting and some buttons.
            // Doesn't seem to catch events from <svg />.
            e.preventDefault();

            e.stopPropagation();
            console.log(e.target);
            nodeSelectionActive.toggle(e.target);
            dispatch(setEditorStatus(SelectionEditorStatus.Idle))
            break;
        } 
      };

      activeDomNodeRef.current.addEventListener('click', handleClick);

      return () => {
        activeDomNodeRef.current.removeEventListener('click', handleClick);

        // Also sets the ref.current value to null here as it should no longer
        // be in use.
        activeDomNodeRef.current = null;
      }
    }
  }, [dispatch, editorStatus]);

  // JSX
  const backgroundActiveJSX = editorStatus === SelectionEditorStatus.Editing && (
    <StyledBackground style={backgroundActiveStyle}>
      <StyledCancelButton onClick={handleCancelButonClick}>
        Cancel
      </StyledCancelButton>
    </StyledBackground>
  );

  const backgroundHoverJSX = editorStatus === SelectionEditorStatus.Selecting && (
    <StyledBackground style={backgroundHoverStyle} />
  );

  return (
    <>
      {backgroundHoverJSX}
      {backgroundActiveJSX}
    </>
  );
};

export default Editor;
