console.log('Added content_scripts')

const synth = window.speechSynthesis;
chrome.runtime.onMessage.addListener((message) => {
  const utter = new SpeechSynthesisUtterance(message.action);
  synth.speak(utter);
});
