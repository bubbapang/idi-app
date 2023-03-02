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

// const Carrot = () => (
//   <div style={{ color: "orange", fontSize: "100px" }}>
//     <i className="fa-solid fa-carrot"></i>
//   </div>
// );

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          {/* <Carrot /> */}
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

// createRoot instead of reactDOM.render
const renderApplication = () => {
  createRoot(document.getElementById("root")).render(<Root />);
}

if (
  sessionStorage.getItem("currentUser") === null ||
  sessionStorage.getItem("X-CSRF-Token") === null 
) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}