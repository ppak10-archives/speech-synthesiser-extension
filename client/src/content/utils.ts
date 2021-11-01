/**
 * utils.ts
 * Utility classes and functions used within content script.
 */

export const synthesize = async (text) => {
  const request = {
    audioConfig: {
      audioEncoding: 'MP3',
    },
    voice: {
      languageCode: 'en-US',
      ssmlGender: 'NEUTRAL',
    },
    input: {
      text,
    }
  }
  const response = await fetch(`http://localhost:5000/synthesize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (response.status === 200) {
    const data = await response.json();
    const audio = new Audio('data:audio/mp3;base64,' + data.audio_content);
    audio.play();
  }
};
