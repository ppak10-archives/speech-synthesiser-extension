/**
 * config.ts
 * Configurations for voice related exports.
 */

// Node Modules
import { v4 as uuidv4 } from 'uuid';

// Types
import { Voice } from 'voice/types';

export const VOICE: Voice = {
  name: undefined,
  pitch: 1,
  rate: 1,
  title: '',
  uuid: uuidv4(),
  volume: 1,
};

export const EXAMPLE_TEXT = 'The quick brown fox jumped over the lazy dog.';
