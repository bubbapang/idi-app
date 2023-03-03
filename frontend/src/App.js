import React from "react";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import ItemIndex from "./components/ItemIndex/ItemIndex";

function App() {
  return (
    <>
      <Navigation />
        <Switch>
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route> */}
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/">
            <ItemIndex />
          </Route>
        </Switch>
    </>
  );
}

export default App;