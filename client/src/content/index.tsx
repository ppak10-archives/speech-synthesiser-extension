/**
 * index.tsx
 * Entry file for react app injected with content script.
 */

// Node Modules
import { render } from 'react-dom';

// Components
import App from './App';

console.log('Added content_scripts')

// Injects `div` element into document to utilize as root for react app.
const root = document.createElement('div');
root.setAttribute('id', 'speakeasy-root');

document.body.appendChild(root);
render(<App />, root)

