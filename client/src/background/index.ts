let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  setUpContextMenus();
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

const handleClick = (info) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: info.selectionText })
  });
}

const setUpContextMenus = () => {
  chrome.contextMenus.create({
    id: 'contextMenuItem',
    title: 'Context Menu Item',
    contexts: ['selection'],
  });
  chrome.contextMenus.onClicked.addListener(handleClick)
};
