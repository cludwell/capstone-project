import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css";
import { NavLink } from "react-router-dom";
import LoginModal from "../LoginModal";
import SignUpModal from "../SignUpModal";

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

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);
  return (
    <>
      {user ? (
        <img
          onClick={openMenu}
          className="profile-button-picture profile-button transition ease-in-out duration-200 hover:scale-125"
          src={`${user.profilePic}`}
          alt="user-profile-pic"
        />
      ) : (
        <>
          <LoginModal />
          <SignUpModal />
        </>
      )}

      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <p className=" py-1 montserrat text-xl">{user.username}</p>
            <p className=" py-1 montserrat text-xl">{user.email}</p>
            <NavLink to={`/users/${user.id}`}>Profile</NavLink>
            <hr></hr>
            <NavLink to={`/about`}>About Fancamp</NavLink>
            <button
              onClick={handleLogout}
              className="bg-indigo-500 text-white font-bold uppercase p-3 rounded-lg transition duration-200  active:bg-indigo-800 active:scale-90 montserrat my-3"
            >
              sign out
            </button>
          </>
        ) : (
          <>
          <LoginModal />
          <SignUpModal />
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
