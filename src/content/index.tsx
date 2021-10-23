console.log('Added content_scripts')

const synth = window.speechSynthesis;
chrome.runtime.onMessage.addListener((message) => {
  console.log('called', message);
  const utter = new SpeechSynthesisUtterance(message.action);
  synth.speak(utter);
});
