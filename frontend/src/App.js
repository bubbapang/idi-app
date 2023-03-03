import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation/Navigation";
import ItemIndex from "./components/ItemIndex/ItemIndex";
import Cart from './components/Cart';
import ProduceList from './components/ProduceList';

function App() {
  const [showCart, setShowCart] = useState(false);
  return (
    <>
      <>
        <nav>
          <h1>Grocery Store</h1>
          <button className="checkout-button" onClick={() => setShowCart(true)}>
            <i className="fas fa-shopping-bag" />
            Checkout
          </button>
        </nav>
        <main style={showCart ? { marginRight: '300px' } : {}} >
          <ProduceList />
        </main>
        <div
          className="sidebar"
          style={showCart ? { transform: 'translateX(-100%)' } : {}}
        >
          <div className="sidebar-header">
            <button className="arrow-button" onClick={() => setShowCart(false)}>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <Cart />
        </div>
      </>
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