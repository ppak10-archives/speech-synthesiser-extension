console.log('Added content_scripts')

const synthesize = async (text) => {
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
  const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_API_KEY}`, {
    method: 'POST',
    body: JSON.stringify(request),
  });

  if (response.status === 200) {
    const data = await response.json();
    const audio = new Audio('data:audio/mp3;base64,' + data.audioContent);
    audio.play();
  }
};

// const synth = window.speechSynthesis;
chrome.runtime.onMessage.addListener((message) => {
  console.log('called google text to speech', message);
  // const utter = new SpeechSynthesisUtterance(message.action);
  // synth.speak(utter);
  synthesize(message.action);
});
