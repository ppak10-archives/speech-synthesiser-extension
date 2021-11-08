/**
 * Page.tsx
 * Page component to manage and create voices.
 */

// Node Modules
import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

// Components
import Modal from 'common/components/Modal';
import VoiceListItem from 'voice/components/ListItem';
import VoiceForm from 'voice/components/Form';

// Config
import { VOICE } from 'voice/config';

// Styled Components
const StyledPage = styled.div``;

// Types
import { Voice } from 'voice/types';
interface StorageVoice {
  [key: string]: Voice;
}

const Page: FC = () => {
  // Hooks
  const [voices, setVoices] = useState<StorageVoice>({});
  const [voice, setVoice] = useState(VOICE);
  const [createModalIsShown, setCreateModalIsShown] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get('voices', (data) => {
      console.log('voices', data);
      setVoices(data.voices);
    })
  }, []);

  useEffect(() => {
    // Adds listener to update component state for `voices` whenever.
    // `chrome.storage.sync.set` is utilized.
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.voices) {
        setVoices(changes.voices.newValue);
      }
    });
  }, []);

  // Callbacks
  const handleCreate = () => {
    const nextVoices = {
      ...voices,
      [voice.uuid]: voice,
    };

    chrome.storage.sync.set({ voices: nextVoices });
  };

  const handleDelete = (uuid: string) => {
    const nextVoices = Object.values(voices).reduce((acc, voice) => {
      if (uuid !== voice.uuid) {
        acc[voice.uuid] = voice;
      }
      return acc;
    }, {});

    chrome.storage.sync.set({ voices: nextVoices });
  };

  // JSX
  const voicesJSX = Object.values(voices).map((voice) => (
    <VoiceListItem voice={voice} key={voice.uuid} onDelete={handleDelete} />
  ));

  const createModalJSX = createModalIsShown && (
    <Modal>
      <button onClick={() => setCreateModalIsShown(false)}>Close</button>
      <VoiceForm onChange={setVoice} onSubmit={handleCreate} voice={voice} />
    </Modal>
  )

  return (
    <>
      <StyledPage>
        <div>
          <h1>Voices</h1>
          <button onClick={() => setCreateModalIsShown(true)}>
            Create Voice
          </button>
        </div>
        <ul>
          {voicesJSX}
        </ul>
      </StyledPage>
      {createModalJSX}
    </>
  );
};

export default Page;
