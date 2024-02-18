import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { authenticate } from "../store/session";
import { fetchUserCart } from "../store/carts";
import IconLightning from "./Icons/IconLightning";
import IconHeart from "./Icons/IconHeart";
import ProfileButton from "./ProfileButton";
import CartModal from "./CartModal";
// import ThemeToggleButton from "../context/Theme";

export default function Header({ isLoaded }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) setShowMenu(false);
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  const closeMenu = (e) => setShowMenu(false);

  useEffect(() => {
    dispatch(authenticate());
    dispatch(fetchUserCart());
  }, [dispatch]);
  const user = useSelector((state) => state.session.user);
  const album = useSelector((state) => state.albums.singleAlbum);
  const band = useSelector((state) => state.bands.singleBand);
  let cart = useSelector((state) => state.cart.userCart);
  cart = user ? cart : [];

  const rgbaParser = (str) =>
    `rgba(${parseInt(str.slice(1, 3), 16)}, ${parseInt(
      str.slice(3, 5),
      16
    )}, ${parseInt(str.slice(5), 16)}, 1)`;

  return (
    <div
      className="flex flex-row justify-center items-center border-b border-gray-400 left-0 h-14 dark:bg-slate-900"
      style={{
        backgroundColor:
          album && album?.Band && album?.Band?.backgroundColorSecondary
            ? rgbaParser(album.Band.backgroundColorSecondary)
            : band && band.backgroundColorSecondary
            ? rgbaParser(band.backgroundColorSecondary)
            : null,
      }}
    >
      <div className="flex flex-row justify-between w-full max-w-screen-lg mx-4">
        <div className="font-bold text-2xl sm:text-3xl  ">
          <NavLink
            to={"/"}
            style={{
              textDecoration: "none",
              color:
                album && album.Band && album.Band.textColor
                  ? album.Band.textColor
                  : band && band.textColor
                  ? band.textColor
                  : "#000000",
            }}
          >
            fanca🤘p
          </NavLink>
        </div>

        <div className="flex flex-row gap-6 sm:gap-12">
          {cart && cart.length ? (
            <div className="transition duration-200 ease-in-out flex flex-col justify-center items-center relative cursor-pointer">
              <div className=" absolute bg-red-600 text-white font-bold rounded-2xl p-1 opacity-80 left-3 bottom-5">
                {cart.length}
              </div>
              <CartModal user={user} album={album} band={band} />
            </div>
          ) : null}

          <NavLink
            to={`/about`}
            className="group transition duration-200 ease-in-out flex flex-col justify-center content-center relative"
          >
            <IconLightning album={album} band={band} />
            <div className="bg-white rounded-xl shadow-xl border-[1.5px] w-28 border-slate-300 absolute top-12 transition-all opacity-0 p-3 -translate-x-1/2 left-1/2 group-hover:opacity-100 group-hover:z-40">
              About the developer
            </div>
          </NavLink>

          <div className="user-collection transition duration-200 ease-in-out flex flex-col justify-center content-center">
            {user && user.id && (
              <NavLink to={`/users/${user.id}`}>
                <IconHeart album={album} band={band} />
              </NavLink>
            )}
          </div>
          <ProfileButton />
        </div>
      </div>
    </div>
  );
}
