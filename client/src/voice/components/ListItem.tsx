/**
 * ListItem.tsx
 * List item component for created voice.
 */

// Node Modules
import { func } from 'prop-types';
import { FC, useEffect, useState } from 'react';

// Components
import Modal from 'common/components/Modal';

// Config
import { EXAMPLE_TEXT } from 'voice/config';

// Prop Types
import { voicePropType } from 'voice/prop_types';

// Types
import { Voice } from 'voice/types';

interface ListItemProps {
  onDelete: (uuid: string) => void;
  voice: Voice;
}

const synth = window.speechSynthesis;

const ListItem: FC<ListItemProps> = ({ onDelete, voice }) => {
  // Hooks
  const [browserVoices, setBrowserVoices] = useState([]);
  const [modalIsShown, setModalIsShown] = useState(false);

  useEffect(() => {
    // Retrieves voices available on browser.
    setBrowserVoices(synth.getVoices());
  }, []);

  // Callbacks
  const handleDelete = () => {
    onDelete(voice.uuid);
    setModalIsShown(false);
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
  const deleteModalJSX = modalIsShown && (
    <Modal>
      <h1>Delete</h1>
      <div>
        <button onClick={handleDelete}>Yes</button>
        <button onClick={() => setModalIsShown(false)}>No</button>
      </div>
    </Modal>
  );

  return (
    <>
      <li>
        <h2>{voice.title}</h2>
        <pre>{voice.uuid}</pre>
        <button onClick={() => setModalIsShown(true)}>Delete</button>
        <button onClick={handleTestVoice}>Test</button>
      </li>
      {deleteModalJSX}
    </>
  );
};

export default ListItem;

ListItem.propTypes = {
  onDelete: func,
  voice: voicePropType,
};
