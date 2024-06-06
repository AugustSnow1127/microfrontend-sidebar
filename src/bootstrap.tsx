import React from 'react';
// import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { createMemoryHistory, createBrowserHistory, LocationListener, History } from 'history';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <App />
// );
interface MountOptions {
  onNavigate?: LocationListener;
  defaultHistory?: History<unknown>;
  initialPath?: string;
}

const mount = (
  el: HTMLElement,
  { onNavigate, defaultHistory, initialPath }: MountOptions
): { onParentNavigate: LocationListener } => {
  const history = 
    defaultHistory || 
    createMemoryHistory({ initialEntries: [initialPath ?? '/'] });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  render(
    <Router history={history}>
      <App />
    </Router>,
    el
  );

  return {
    onParentNavigate({ pathname }) {
      if (history.location.pathname !== pathname) {
        console.log('container navigate to', pathname);
        history.push(pathname);
      }
    },
  };
};

const devRoot: HTMLElement | null = document.querySelector('#_ts-app');
if (devRoot) {
  mount(devRoot, { defaultHistory: createBrowserHistory() });
}

export { mount };