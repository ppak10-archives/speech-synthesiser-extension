/**
 * App.tsx
 * Main extension app injected through content script.
 */

// Node Modules
import { FC, useEffect } from 'react';

// Actions
import { setEditorStatus } from './selection/actions';

// Components
import SelectionEditor from './selection/components/Editor';
import Navbar from './navigation/components/Navbar';

// Enums
import { MessageType } from 'background/enums';
import { SelectionEditorStatus } from 'content/selection/enums';

// Hooks
import { useAppDispatch, useAppSelector } from 'content/hooks';

// Utils
import { synthesize } from './utils';

const App: FC = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const editorStatus = useAppSelector(({ selection }) => selection.editorStatus);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      switch (message.type) {
        case MessageType.SynthesizeText:
          synthesize(message.payload.selectionText);
          break;
        case MessageType.ToggleSelectFromPage:
          dispatch(setEditorStatus(SelectionEditorStatus.Selecting));
          break;
      }
    });
  }, [dispatch]);

  useEffect(() => {
    switch (editorStatus) {
      case SelectionEditorStatus.Selecting:
        chrome.runtime.sendMessage({
          type: MessageType.SelectionEditorStatusSelecting,
        });
        break;
      default:
        chrome.runtime.sendMessage({
          type: MessageType.SelectionEditorStatusIdle,
        })
    }
  }, [editorStatus]);

  return (
    <>
      <SelectionEditor />
      <Navbar />
    </>
  );
}

export default App;
