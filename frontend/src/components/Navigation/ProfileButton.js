import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(true);

  // console.log('showMenu', showMenu)
  
  const toggleMenu = (e) => {
    // stopping event things from happening
    e.preventDefault();
    e.stopPropagation();

    // toggle the menu
    setShowMenu(!showMenu)
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.email}</li>
          <li>
            <button className="logout-button" onClick={logout}>
              <i className="fas fa-sign-out-alt" alt="Sign Out"></i>
            </button>
          </li>
        </ul>
      )}
      <button className="profile-button" onClick={toggleMenu}>
        <i className="fa-solid fa-user-circle" />
      </button>
    </>
  );
}

export default ProfileButton;
