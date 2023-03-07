import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginModal';
import SignupFormModal from '../SignupModal';
import Searchbar from './Searchbar';
import Cart from '../Cart';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const [showCart, setShowCart] = useState(false);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser} />
        <button className="cart-button" onClick={() => setShowCart(!showCart)}>
          <i className="fas fa-shopping-cart"></i>
        </button>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <div className='modals'>
          <LoginFormModal />
          <SignupFormModal />
        </div>
      </>
    );
  }

  return (
    <>
      <nav>
        <h1>grocerease</h1>
        <Searchbar id="searchbar"/>
        <div className="nav-links">
          {sessionLinks}
        </div>
      </nav>
      <div className="sidebar" style={showCart ? { right: 0 } : {}}>
        <div className="sidebar-header">
          <button className="arrow-button" onClick={() => setShowCart(false)}>
            <i className="fas fa-arrow-left"></i>
          </button>
        </div>
        <Cart />
      </div>
    </>
  );
}

export default Navigation;
