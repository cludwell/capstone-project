import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './ProfileButton.css'
import { NavLink } from "react-router-dom";
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);
  return (
    <>
      {user ? (
              <img
              onClick={openMenu}
              className="profile-button-picture profile-button" src={`${user.profilePic}`} alt="user-profile-pic" />
             ) : (
        <div className="sign-or-login">

        <OpenModalButton
        buttonText="log in"
        onItemClick={closeMenu}
        modalComponent={<LoginFormModal
        />} />
      <OpenModalButton
        buttonText="sign up"
        onItemClick={closeMenu}
        modalComponent={<SignupFormModal />} />
      </div>
      )}

      {/* <button onClick={openMenu} className="profile-button">
        <i className="fas fa-user-circle" />
      </button> */}
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <NavLink to={`/users/${user.id}`} style={{textDecoration: "none"}}>purchases</NavLink>
            <hr></hr>
            <NavLink to={`/about`} style={{textDecoration: "none"}}>About Fancamp</NavLink>
            <p>help</p>
            <button onClick={handleLogout} className="band-deets-user-auth">sign out</button>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
