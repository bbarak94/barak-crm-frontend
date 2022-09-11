import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './configure-store'

import { RootCmp } from './root-cmp';
import './assets/styles/main.scss';

const store = configureStore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <RootCmp />
    </Router>
  </Provider>
)


    // const root = ReactDOM.createRoot(document.getElementById('root'));
    // root.render(
    //   <React.StrictMode>
    //     <Router >
    //       <RootCmp />
    //     </Router>
    //   </React.StrictMode>
    // )