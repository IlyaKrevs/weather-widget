import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FluentProvider, webDarkTheme } from '@fluentui/react-components';
import { store } from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <FluentProvider theme={webDarkTheme} >
        <App />
      </FluentProvider >
    </Provider>
  </React.StrictMode>
);

