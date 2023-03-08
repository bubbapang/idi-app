import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import StoreIndex from "./components/Stores";
import ItemIndex from "./components/Items";

function App() {

  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/store/:storeId">
          <ItemIndex />
        </Route>
        <Route path="/">
          <StoreIndex />
        </Route>
      </Switch>
    </>
  );
}

export default App;