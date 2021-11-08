/**
 * Form.tsx
 * Form component for creating / updating voice setting.
 */

// Node Modules
import { func } from 'prop-types';
import { ChangeEvent, FC, FormEvent, MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

// Config
import { EXAMPLE_TEXT, VOICE } from 'voice/config';

// Constants
const UTTERANCE_PITCH_MAX = 2;
const UTTERANCE_VOLUME_MAX = 1;
const UTTERANCE_RATE_MIN = 0.1;

// Seems to break past 2
const UTTERANCE_RATE_MAX = 2;

// Styled Components
const StyledForm = styled.form``;

// Prop Types
import { voicePropType } from 'voice/prop_types';

// Types
import { Voice } from 'voice/types';
interface FormProps {
  onChange: (voice: Voice) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  voice: Voice;
}

const synth = window.speechSynthesis;

const Form: FC<FormProps> = ({ onChange, onSubmit, voice }) => {
  // Hooks
  const [browserVoices, setBrowserVoices] = useState([]);

  useEffect(() => {
    // Retrieves voices available on browser.
    setBrowserVoices(synth.getVoices());
  }, []);

  // Callbacks
  const handleTestVoice = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const utter = new SpeechSynthesisUtterance(EXAMPLE_TEXT);
    utter.pitch = voice.pitch;
    utter.rate = voice.rate;
    utter.voice = browserVoices.find((browserVoice) => browserVoice.name === voice.name);
    utter.volume = voice.volume;

    synth.speak(utter);
  };

  const handleRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Converts string to number before passing to callback.
    onChange({
      ...voice,
      [name]: parseFloat(value),
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    onChange({
      ...voice,
      [name]: value,
    });
  }

  // JSX
  const browserVoiceOptionsJSX = browserVoices.map((voice) => (
    <option key={voice.name} value={voice.name}>{voice.name}</option>
  ));

  return (
    <StyledForm onSubmit={onSubmit}>
      <fieldset>
        <legend>Example Text</legend>
        <textarea value={EXAMPLE_TEXT} readOnly />
        <button onClick={handleTestVoice}>Test</button>
      </fieldset>
      <fieldset>
        <legend>Title</legend>
        <input
          name="title"
          onChange={handleChange}
          placeholder="Please provide a voice title."
          type="text"
          value={voice.title}
        />
      </fieldset>
      <fieldset>
        <legend>Voice Name</legend>
        <select name="name" onChange={handleChange} value={voice.name}>
          <option value=''>-</option>
          {browserVoiceOptionsJSX}
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
          value={voice.pitch}
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
          value={voice.volume}
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
          value={voice.rate}
        />
      </fieldset>
      <button type="submit">Submit</button>
    </StyledForm>
  );
};

export default Form;

Form.defaultProps = {
  voice: VOICE,
};

Form.propTypes = {
  onChange: func,
  onSubmit: func,
  voice: voicePropType,
};
