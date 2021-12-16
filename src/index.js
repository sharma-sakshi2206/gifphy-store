import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store} from './redux/store';
import {Provider} from "react-redux";
import { ThemeProvider } from "./theme-context";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

