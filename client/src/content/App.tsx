/**
 * App.tsx
 * Main extension app injected through content script.
 */

// Node Modules
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

// Enums
import { MessageType } from 'background/enums';

// Styled Components
const StyledApp = styled.div<StyledAppProps>`
  background-color: white;
  display: ${({ innerText }) => innerText === null ? 'none' : 'flex'};
  position: absolute;
  top: 0px;
  left: 0px;
  overflow: scroll;
  height: 500px;
  width: 500px;
  z-index: 999999;
`;

// Types
interface StyledAppProps {
  innerText: string;
}

// Utils
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

const styleNodeValue = (node) => {
  if (node.nodeValue) {
    node.parentNode.setAttribute('style', 'box-shadow: 0px 0px 5px 5px red;')
  }
  if (node.childNodes) {
    node.childNodes.forEach((childNode) => {
      styleNodeValue(childNode)
    });
  }
};

const unstyleNodeValue = (node) => {
  if (node.nodeValue) {
    node.parentNode.removeAttribute('style')
  }
  if (node.childNodes) {
    node.childNodes.forEach((childNode) => {
      unstyleNodeValue(childNode)
    });
  }
};

const App: FC = () => {
  // Hooks
  const [innerText, setInnerText] = useState(null);
  const [selectFromPage, setSelectFromPage] = useState(false);

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
    const handleMouseOver = (e: MouseEvent) => {
      if (selectFromPage) {
        (e.relatedTarget as HTMLElement).removeAttribute('style');
        (e.target as HTMLElement).setAttribute('style', 'background-color: cornflowerblue;');
        setInnerText((e.target as HTMLElement).innerText);
        unstyleNodeValue(e.relatedTarget);
        styleNodeValue(e.target);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [selectFromPage]);

  return (
    <StyledApp innerText={innerText}>
      {innerText}
    </StyledApp>
  );
}

export default App;
