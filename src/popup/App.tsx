/**
 * App.tsx
 * React app component
 */

// Node Modules
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';

const synth = window.speechSynthesis;

const App: FC = () => {
  // Hooks
  const [voices, setVoices] = useState([]);
  const [voiceName, setVoiceName] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    setVoices(synth.getVoices());
  }, []);

  // Callbacks
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
  };

  const handleVoiceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    console.log('value', value)
    setVoiceName(value);
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
    <option value={voice.name}>{voice.name}</option>
  ));

  return (
    <div>
      <h1>Speech Synthesis</h1>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={handleTextChange} />
        <select onChange={handleVoiceChange}>
          {voiceOptionsJSX}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
};

export default App;
