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
  const response = await fetch(`http://localhost:5000/synthesize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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
