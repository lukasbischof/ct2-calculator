/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { hashIntegration, Router } from 'solid-app-router';

render(() => (
  <Router source={hashIntegration()}>
    <App />
  </Router>
), document.getElementById('root') as HTMLElement);
