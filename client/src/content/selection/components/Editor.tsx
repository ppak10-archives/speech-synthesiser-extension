/**
 * Editor.tsx
 * Selection editor for selecting elements and text to synthesize.
 */

// Node Modules
import { CSSProperties, FC, useEffect, useRef, useState } from 'react';

// Constants
const BORDER_RADIUS = '2px';

// Hooks
import { useAppSelector } from 'content/hooks';

// Styled Components
import { StyledBackground } from './Background';

// Utils
import { NodeSelection } from '../utils';

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
  const backgroundActiveDomNodeRef = useRef(null);
  const backgroundHoverDomNodeRef = useRef(null);
  const isSelecting = useAppSelector(({ selection }) => selection.isSelecting);

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

  useEffect(() => {
    const nodeSelectionHover = new NodeSelection('speakeasy-hover-text');
    const nodeSelectionActive = new NodeSelection('speakeasy-active-text');

    const handleMouseOver = (e: MouseEvent) => {
      if (isSelecting) {

        nodeSelectionHover.unstyle(e.relatedTarget);

        nodeSelectionHover.style(e.target)
        backgroundHoverDomNodeRef.current = e.target;

        // Sets absolute position for background hover.
        setBackgroundHoverStyle(createOutlineHoverStyles(e.target as HTMLElement));
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (isSelecting) {
        // Prevents elements like links from redirecting and some buttons.
        // Doesn't seem to catch events from <svg />.
        e.preventDefault();

        nodeSelectionActive.unstyle(backgroundActiveDomNodeRef.current);
        nodeSelectionHover.unstyle(e.target);

        nodeSelectionActive.style(e.target);
        backgroundActiveDomNodeRef.current = e.target;
        setBackgroundActiveStyle(createOutlineHoverStyles(e.target as HTMLElement));
      }
    }

    document.addEventListener('click', handleClick);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isSelecting]);

  return (
    <>
      <StyledBackground style={backgroundHoverStyle} />
      <StyledBackground style={backgroundActiveStyle} />
    </>
  );
};

export default Editor;
