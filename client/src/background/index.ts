/**
 * index.ts
 * Main entry file for background related functions.
 */

// Enums
import { MenuItemId, MessageType } from './enums';

chrome.runtime.onInstalled.addListener(() => {
  setUpContextMenus();
});

chrome.runtime.onMessage.addListener((message) => {
  switch (message.type) {
    case MessageType.SelectionEditorStatusEditing:
    case MessageType.SelectionEditorStatusIdle:
      setUpContextMenus();
      break;
    case MessageType.SelectionEditorStatusSelecting:
      setUpSelectingContextMenus();
      break;
  }
})

const handleMenuItemClick = (info: chrome.contextMenus.OnClickData) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const [tab] = tabs;
    switch (info.menuItemId) {
      case MenuItemId.ReadSelection:
        chrome.tabs.sendMessage(
          tab.id,
          {
            type: MessageType.SynthesizeText,
            payload: {
              selectionText: info.selectionText,
            }
          }
        );
        break;
      case MenuItemId.SelectFromPage:
        chrome.tabs.sendMessage(
          tab.id,
          {
            type: MessageType.SelectionEditorStatusSelecting,
          }
        );
        break;
    }
  });
}

const setUpSelectingContextMenus = () => {
  chrome.contextMenus.create({
    id: MenuItemId.SelectFromPage,
    title: 'Cancel Select From Page',
  })
  chrome.contextMenus.onClicked.addListener(handleMenuItemClick)
};

const setUpContextMenus = () => {
  // This context menu item only appears when text is highlighted by user.
  chrome.contextMenus.create({
    id: MenuItemId.ReadSelection,
    title: 'Read Selection',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: MenuItemId.Main,
    title: 'speakeasy',
  })
  chrome.contextMenus.create({
    id: MenuItemId.SelectFromPage,
    parentId: MenuItemId.Main,
    title: 'Select From Page',
  })
  chrome.contextMenus.onClicked.addListener(handleMenuItemClick)
};
