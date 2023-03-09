import React from 'react';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './context/Modal';
import './index.css';
import App from './App';
import configureStore from './store';
import csrfFetch from "./store/csrf";
import * as sessionActions from './store/session';

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

// createRoot instead of reactDOM.render
const renderApplication = () => {
  createRoot(document.getElementById("root")).render(<Root />);
}

// Conditionally render based on whether session has been restored
const currentUser = sessionStorage.getItem("currentUser");
const csrfToken = sessionStorage.getItem("X-CSRF-Token");
if (!currentUser || !csrfToken) {
  store.dispatch(sessionActions.restoreSession())
    .then(renderApplication)
} else {
  renderApplication();
}
