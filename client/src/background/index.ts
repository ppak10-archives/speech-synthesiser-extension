/**
 * index.ts
 * Main entry file for background related functions.
 */

// Enums
import { MenuItemId, MessageType } from './enums';

chrome.runtime.onInstalled.addListener(() => {
  setUpContextMenus();
});

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
            type: MessageType.ToggleSelectFromPage,
          }
        );
        break;
    }
  });
}

const setUpContextMenus = () => {
  // This context menu item only appears when text is highlighted.
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
