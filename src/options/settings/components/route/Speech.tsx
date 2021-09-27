/**
 * Speech.tsx
 * Page component for managing extension settings.
 */

// Node Modules
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';

const synth = window.speechSynthesis;

const Speech: FC = () => {
  // Hooks
  const [voices, setVoices] = useState([]);
  const [voiceName, setVoiceName] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    setVoices(synth.getVoices());
  }, []);

  useEffect(() => {
    chrome.storage.sync.get('voiceName', ({ voiceName }) => {
      console.log('voiceName', voiceName)
      setVoiceName(voiceName);
    })
  }, []);

  // Callbacks
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
  };

  const handleVoiceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setVoiceName(value);
    chrome.storage.sync.set({ voiceName: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = voices.find((voice) => voice.name === voiceName);
    console.log('voice', utter.voice)
    synth.speak(utter);
  };

  // JSX
  const voiceOptionsJSX = voices.map((voice) => (
    <option key={voice.name} value={voice.name}>{voice.name}</option>
  ));

  return (
    <div>
      <h1>Speech Settings</h1>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={handleTextChange} />
        <select onChange={handleVoiceChange} value={voiceName}>
          {voiceOptionsJSX}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Speech;
