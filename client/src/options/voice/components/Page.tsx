/**
 * Page.tsx
 * Page component to manage and create voices.
 */

// Node Modules
import { FC, FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

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
  const [request, setRequest] = useState(VOICE);
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
  const handleCreate = (
    e: FormEvent<HTMLFormElement>,
    voice: Voice = request,
  ) => {
    e.preventDefault();
    chrome.storage.sync.set({
      voices: {
        ...voices,
        [voice.uuid]: voice,
      }
    });
    setCreateModalIsShown(false);
  };

  const handleCreateFrom = (voice: Voice) => {
    chrome.storage.sync.set({
      voices: {
        ...voices,
        [voice.uuid]: voice,
      }
    });
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

  const handleUpdate = (voice: Voice) => {
    chrome.storage.sync.set({
      voices: {
        ...voices,
        [voice.uuid]: voice,
      },
    });
  };

  // JSX
  const voicesJSX = Object.values(voices).map((voice) => (
    <VoiceListItem
      voice={voice}
      key={voice.uuid}
      onCreateFrom={handleCreateFrom}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />
  ));

  const createModalJSX = createModalIsShown && (
    <Modal>
      <button onClick={() => setCreateModalIsShown(false)}>Close</button>
      <VoiceForm onChange={setRequest} onSubmit={handleCreate} voice={request} />
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
