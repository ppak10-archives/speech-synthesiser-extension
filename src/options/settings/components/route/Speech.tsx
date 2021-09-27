/**
 * Speech.tsx
 * Page component for managing extension settings.
 */

// Node Modules
import { ChangeEvent, FC, useEffect, useState } from 'react';

// Constants
const UTTERANCE_PITCH_MAX = 2;
const UTTERANCE_VOLUME_MAX = 1;
const UTTERANCE_RATE_MIN = 0.1;

// Seems to break past 2
const UTTERANCE_RATE_MAX = 2;
const DEFAULT_UTTERANCE = {
  pitch: 1,
  rate: 1,
  voice: null,
  volume: 1,
};

const synth = window.speechSynthesis;

const Speech: FC = () => {
  // Hooks
  const [voices, setVoices] = useState([]);
  const [utterance, setUtterance] = useState(DEFAULT_UTTERANCE);
  const [text, setText] = useState('');

  useEffect(() => {
    setVoices(synth.getVoices());
  }, []);

  useEffect(() => {
    chrome.storage.sync.get('utterance', ({ utterance }) => {
      setUtterance(utterance || DEFAULT_UTTERANCE);
    })
  }, []);

  // console.log(utterance)

  useEffect(() => {
    chrome.storage.sync.set({ utterance });
  }, [utterance]);

  // Callbacks
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value);
  };

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUtterance((prevState) => ({
      ...prevState,
      [name]: parseFloat(value),
    }));
  };

  const handleVoiceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setUtterance((prevState) => ({
      ...prevState,
      voice: value,
    }));
  };

  const handleClick = () => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = voices.find((voice) => voice.name === utterance.voice);
    utter.rate = utterance.rate;
    utter.volume = utterance.volume;
    utter.pitch = utterance.pitch;
    // console.log(utter, utterance);
    synth.speak(utter);
  };

  // JSX
  const voiceOptionsJSX = voices.map((voice) => (
    <option key={voice.name} value={voice.name}>{voice.name}</option>
  ));

  return (
    <div>
      <h1>Speech Settings</h1>
      <fieldset>
        <legend>Example Text</legend>
        <textarea onChange={handleTextAreaChange} value={text} />
        <button onClick={handleClick}>Submit</button>
      </fieldset>
      <fieldset>
        <legend>Voice</legend>
        <select onChange={handleVoiceChange} value={utterance.voice}>
          {voiceOptionsJSX}
        </select>
      </fieldset>
      <fieldset>
        <legend>Pitch</legend>
        <input
          max={UTTERANCE_PITCH_MAX}
          min={0}
          name="pitch"
          onChange={handleRangeChange}
          step={0.1}
          type="range"
          value={utterance.pitch}
        />
      </fieldset>
      <fieldset>
        <legend>Volume</legend>
        <input
          max={UTTERANCE_VOLUME_MAX}
          min={0}
          name="volume"
          onChange={handleRangeChange}
          step={0.1}
          type="range"
          value={utterance.volume}
        />
      </fieldset>
      <fieldset>
        <legend>Rate</legend>
        <input
          max={UTTERANCE_RATE_MAX}
          min={UTTERANCE_RATE_MIN}
          name="rate"
          onChange={handleRangeChange}
          step={0.1}
          type="range"
          value={utterance.rate}
        />
      </fieldset>
    </div>
  )
}

export default Speech;
