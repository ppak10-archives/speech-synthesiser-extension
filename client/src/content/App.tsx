/**
 * App.tsx
 * Main extension app injected through content script.
 */

// Node Modules
import { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// Constants
const BORDER_RADIUS = '2px';

// Enums
import { MessageType } from 'background/enums';

// Styled Components
const StyledOutline = styled.div.attrs<StyledOutlineProps>(({ style }) => ({
  style,
}))<StyledOutlineProps>`
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

// Types
interface StyledOutlineProps {
  style: CSSProperties;
}

// Utils
import { NodeSelection } from './utils';
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

const synthesize = async (text) => {
  const request = {
    audioConfig: {
      audioEncoding: 'MP3',
    },
    voice: {
      languageCode: 'en-US',
      ssmlGender: 'NEUTRAL',
    },
    input: {
      text,
    }
  }
  const response = await fetch(`http://localhost:5000/synthesize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (response.status === 200) {
    const data = await response.json();
    const audio = new Audio('data:audio/mp3;base64,' + data.audio_content);
    audio.play();
  }
};

const App: FC = () => {
  // Hooks
  const outlineActiveDomNodeRef = useRef(null);
  const outlineHoverDomNodeRef = useRef(null);
  const [selectFromPage, setSelectFromPage] = useState(false);

  const [outlineActiveStyle, setOutlineActiveStyle] = useState<CSSProperties>({
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

  const [outlineHoverStyle, setOutlineHoverStyle] = useState<CSSProperties>({
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
    chrome.runtime.onMessage.addListener((message) => {
      switch (message.type) {
        case MessageType.SynthesizeText:
          synthesize(message.payload.selectionText);
          break;
        case MessageType.ToggleSelectFromPage:
          setSelectFromPage((prevState) => !prevState);
      }
    });
  }, []);

  useEffect(() => {
    const nodeSelectionHover = new NodeSelection('speakeasy-hover-text');
    const nodeSelectionActive = new NodeSelection('speakeasy-active-text');

    const handleMouseOver = (e: MouseEvent) => {
      if (selectFromPage) {

        nodeSelectionHover.unstyle(e.relatedTarget);

        nodeSelectionHover.style(e.target)
        outlineHoverDomNodeRef.current = e.target;

        // Sets absolute position for outline hover.
        setOutlineHoverStyle(createOutlineHoverStyles(e.target as HTMLElement));
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (selectFromPage) {
        // Prevents elements like links from redirecting and some buttons.
        // Doesn't seem to catch events from <svg />.
        e.preventDefault();

        nodeSelectionActive.unstyle(outlineActiveDomNodeRef.current);
        nodeSelectionHover.unstyle(e.target);

        nodeSelectionActive.style(e.target);
        outlineActiveDomNodeRef.current = e.target;
        setOutlineActiveStyle(createOutlineHoverStyles(e.target as HTMLElement));
      }
    }

    document.addEventListener('click', handleClick);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [selectFromPage]);

  return (
    <>
      <StyledOutline style={outlineHoverStyle} />
      <StyledOutline style={outlineActiveStyle} />
    </>
  );
}

export default App;

