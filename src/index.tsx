/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { hashIntegration, Router } from 'solid-app-router';

render(() => (
  <Router source={hashIntegration()}>
    <App />
    <div class='container mt-2'>
      <a href="https://github.com/lukasbischof/ct2-calculator" target="_blank" class="me-2">Github</a>
      <a href="https://ct2.luk4s.dev/gpio/index.html" target="_blank">Zusammenfassung</a>
    </div>
  </Router>
), document.getElementById('root') as HTMLElement);
