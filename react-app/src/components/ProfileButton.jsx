import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/session";
import { NavLink } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import IconUser from "./IconUser";
import IconInfo from "./IconInfo";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const user = useSelector(state => state.session.user)


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
    setShowMenu(false)
  };

  const closeMenu = () => setShowMenu(prev => !prev);
  return (
    <div className="relative">
      {user ? (
        <img
          onClick={() => setShowMenu(true)}
          className="profile-button-picture profile-button transition ease-in-out duration-200 rounded-full h-14 aspect-square object-cover hover:scale-125 z-20"
          src={`${user.profilePic}`}
          alt="user-profile-pic"
        />
      ) : (
        <>
          <LoginModal />
          <SignUpModal />
        </>
      )}
      <div
        className={`absolute right-0 top-20 bg-white rounded-xl drop-shadow-lg p-8 transition ease-in-out duration-400 w-96 z-20 ${
          showMenu ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
        ref={ulRef}
      >
        {user && (
          <>
            <p className=" py-1 montserrat text-lg text-center">
              {user.username}
            </p>
            <p className=" montserrat text-lg text-gray-700 text-center">
              {user.email}
            </p>
            <hr></hr>
            <div className="flex flex-col">
              <NavLink
                to={`/users/${user.id}`}
                className="hover:bg-slate-200 flex flex-row rounded-xl p-1 transition ease-in-out duration-200 w-full py-3 my-1"
                onClick={closeMenu}
              >
                <IconUser />

                <div>Profile</div>
              </NavLink>
              <NavLink
                to={`/about`}
                className="hover:bg-slate-200 flex flex-row rounded-xl p-1 transition ease-in-out duration-200 w-full py-3 my-1"
                onClick={closeMenu}
              >
                <IconInfo />

                <div>About Fancamp</div>
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-indigo-500 text-white font-bold uppercase p-3 rounded-lg transition duration-200  active:bg-indigo-800 active:scale-90 montserrat my-3"
              >
                sign out
              </button>
            </div>
          </>
        ) }
      </div>
    </div>
  );
}

export default ProfileButton;
