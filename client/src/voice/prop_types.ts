/**
 * prop_types.ts
 * Commonly used voice prop types.
 */

// Node Modules
import { exact, number, string } from 'prop-types';

export const voicePropType = exact({
  name: string,
  pitch: number.isRequired,
  rate: number.isRequired,
  title: string.isRequired,
  uuid: string.isRequired,
  volume: number.isRequired,
});
