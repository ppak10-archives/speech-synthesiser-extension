/**
 * App.tsx
 * Main extension app injected through content script.
 */

// Node Modules
import { FC, useEffect } from 'react';

// Actions
import { setIsSelecting } from './selection/actions';

// Components
import SelectionEditor from './selection/components/Editor';

// Enums
import { MessageType } from 'background/enums';

// Hooks
import { useAppDispatch } from 'content/hooks';

// Utils
import { synthesize } from './utils';

const App: FC = () => {
  // Hooks
  const dispatch = useAppDispatch();

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      switch (message.type) {
        case MessageType.SynthesizeText:
          synthesize(message.payload.selectionText);
          break;
        case MessageType.ToggleSelectFromPage:
          dispatch(setIsSelecting(true));
      }
    });
  }, [dispatch]);

  return (
    <SelectionEditor />
  );
}

export default App;
