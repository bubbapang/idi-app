import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/signup">Sign Up</NavLink>
        <br></br>
        <br></br>
        <LoginFormModal />
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/"  >Home</NavLink>
        <br></br>
        <br></br>
        {sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
