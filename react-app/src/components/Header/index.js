import "./Header.css";
import Navigation from "../Navigation";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { authenticate } from "../../store/session";
import { fetchUserCart } from "../../store/carts";
import OpenModalCheckout from "../OpenModalButton/OpenModalCheckOut";
import CheckOutModal from "../CheckOutModal";

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
      className="header-container"
      style={{
        backgroundColor:
          album && album?.Band && album?.Band?.backgroundColorSecondary
            ? rgbaParser(album.Band.backgroundColorSecondary)
            : band && band.backgroundColorSecondary
            ? rgbaParser(band.backgroundColorSecondary)
            : null,
      }}
    >
      <div className="logo-text">
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

      <div className="flex flex-row mr-3 gap-10 items-center">
        {cart && cart.length ? (
          <div className="navi-items navi-items cart-div">
            <div className="number-in-cart">{cart.length}</div>
            <OpenModalCheckout
              buttonText={
                <i
                  className="fa-solid fa-cart-shopping navi-icons"
                  style={{
                    color:
                      album && album.Band && album.Band.textColor
                        ? album.Band.textColor
                        : band && band.textColor
                        ? band.textColor
                        : null,
                  }}
                ></i>
              }
              onItemClick={closeMenu}
              modalComponent={<CheckOutModal user={user} cart={cart} />}
            />
          </div>
        ) : null}

        <div className="user-activity-feed navi-items">
          <NavLink to={`/about`}>
            <i
              className="fa-solid fa-bolt-lightning navi-icons"
              style={{
                color:
                  album && album.Band && album.Band.textColor
                    ? album.Band.textColor
                    : band && band.textColor
                    ? band.textColor
                    : null,
              }}
            ></i>
          </NavLink>
        </div>
        <div className="user-collection navi-items">
          {user && user.id ? (
            <NavLink
              to={`/users/${user.id}`}
              style={{ textDecoration: "none" }}
            >
              <i
                className="fa-regular fa-heart navi-icons"
                style={{
                  color:
                    album && album.Band && album.Band.textColor
                      ? album.Band.textColor
                      : band && band.textColor
                      ? band.textColor
                      : null,
                }}
              />
            </NavLink>
          ) : (
            <i
              className="fa-regular fa-heart navi-icons"
              style={{
                color:
                  album && album.Band && album.Band.textColor
                    ? album.Band.textColor
                    : band && band.textColor
                    ? band.textColor
                    : null,
              }}
            />
          )}
        </div>

        <div className="navi-items navi-items">
          <Navigation isLoaded={isLoaded} />
        </div>
      </div>
    </div>
  );
}
