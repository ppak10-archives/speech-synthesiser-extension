/**
 * types.ts
 * Voice related types.
 */

export interface Voice {
  pitch: number;
  rate: number;
  title: string; // user title for custom voice.
  uuid: string;
  name?: string; // name set by provider, some may allow `null` for default.
  volume: number;
}
