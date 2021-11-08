/**
 * ListItem.tsx
 * List item component for created voice.
 */

// Node Modules
import { func } from 'prop-types';
import { FC, FormEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Components
import VoiceForm from 'voice/components/Form';
import Modal from 'common/components/Modal';

// Config
import { EXAMPLE_TEXT } from 'voice/config';

// Prop Types
import { voicePropType } from 'voice/prop_types';

// Types
import { Voice } from 'voice/types';

interface ListItemProps {
  onCreateFrom: (voice: Voice) => void;
  onDelete: (uuid: string) => void;
  onUpdate: (voice: Voice) => void;
  voice: Voice;
}

const synth = window.speechSynthesis;

const ListItem: FC<ListItemProps> = ({
  onCreateFrom,
  onDelete,
  onUpdate,
  voice,
}) => {
  // Hooks
  const [browserVoices, setBrowserVoices] = useState([]);
  const [deleteModalIsShown, setDeleteModalIsShown] = useState(false);
  const [updateModalIsShown, setUpdateModalIsShown] = useState(false);
  const [createFromModalIsShown, setCreateFromModalIsShown] = useState(false);
  const [request, setRequest] = useState(voice);

  useEffect(() => {
    // Retrieves voices available on browser.
    setBrowserVoices(synth.getVoices());
  }, []);

  useEffect(() => {
    // Updates request object if prop ever changes.
    setRequest(voice);
  }, [voice]);

  // Callbacks
  const handleCreateFrom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreateFrom({
      ...request,
      uuid: uuidv4(),
    });
    setCreateFromModalIsShown(false);
    setRequest(voice);
  };

  const handleCreateFromModalClose = () => {
    setCreateFromModalIsShown(false);
    setRequest(voice);
  }

  const handleDelete = () => {
    onDelete(voice.uuid);
    setDeleteModalIsShown(false);
  };

  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate(request);
    setUpdateModalIsShown(false);
  };

  const handleUpdateModalClose = () => {
    setDeleteModalIsShown(false);
    setRequest(voice);
  };

  const handleTestVoice = () => {
    const utter = new SpeechSynthesisUtterance(EXAMPLE_TEXT);
    utter.pitch = voice.pitch;
    utter.rate = voice.rate;
    utter.voice = browserVoices.find((browserVoice) => browserVoice.name === voice.name);
    utter.volume = voice.volume;

    synth.speak(utter);
  };

  // JSX
  const createFromModalJSX = createFromModalIsShown && (
    <Modal>
      <h1>Create From <b>{voice.title}</b></h1>
      <button onClick={handleCreateFromModalClose}>Cancel</button>
      <VoiceForm
        onChange={setRequest}
        onSubmit={handleCreateFrom}
        voice={request}
      />
    </Modal>
  );

  const deleteModalJSX = deleteModalIsShown && (
    <Modal>
      <h1>Delete Voice</h1>
      <p>
        Are you sure you would like to delete voice&nbsp;
        <b>{voice.title}</b>
        ?
      </p>
      <div>
        <button onClick={handleDelete}>Yes</button>
        <button onClick={() => setDeleteModalIsShown(false)}>No</button>
      </div>
    </Modal>
  );

  const updateModalJSX = updateModalIsShown && (
    <Modal>
      <h1>Update</h1>
      <button onClick={handleUpdateModalClose}>Cancel</button>
      <VoiceForm
        onChange={setRequest}
        onSubmit={handleUpdate}
        voice={request}
      />
    </Modal>
  );

  return (
    <>
      <li>
        <h2>{voice.title}</h2>
        <pre>{voice.uuid}</pre>
        <button onClick={() => setCreateFromModalIsShown(true)}>
          Create From
        </button>
        <button onClick={() => setUpdateModalIsShown(true)}>Update</button>
        <button onClick={() => setDeleteModalIsShown(true)}>Delete</button>
        <button onClick={handleTestVoice}>Test</button>
      </li>
      {createFromModalJSX}
      {deleteModalJSX}
      {updateModalJSX}
    </>
  );
};

export default ListItem;

ListItem.propTypes = {
  onCreateFrom: func,
  onDelete: func,
  onUpdate: func,
  voice: voicePropType,
};
