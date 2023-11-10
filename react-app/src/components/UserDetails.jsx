import { NavLink, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { fetchUserPurchases } from "../store/purchases";
import { fetchUsers } from "../store/users";
import UserDetailsAlbum from "./UserDetailsAlbum";
import { fetchAllBands } from "../store/bands";
import { authenticate } from "../store/session";

export default function UserDetails() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  //appearing collection/wishlist albums
  const [showBody, setShowBody] = useState(false);
  const history = useHistory();
  const ulRef = useRef();

  useEffect(() => {
    if (!showBody) return;
    const closeBody = (e) => {
      if (!ulRef.current?.contains(e.target)) setShowBody(false);
    };
    document.addEventListener("click", closeBody);
    return () => document.removeEventListener("click", closeBody);
  });

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchUserPurchases(userId));
      await dispatch(fetchUsers());
      await dispatch(fetchAllBands());
      await dispatch(authenticate());
    };
    loadData();
  }, [dispatch, userId]);

  const users = useSelector((state) => state.users);
  const user = users[userId];
  const loggedIn = useSelector((state) => state.session.user);
  const bands = useSelector((state) => state.bands.allBands);
  if (!user || !Object.values(user).length) return null;

  const startBand = (e) => {
    history.push("/bands/new");
  };

  return (
    <div className="min-h-screen flex flex-col items-center mx-2">
      <div className=" absolute z-0 w-screen bg-sky-300 h-40 mt-1"></div>
      <div className=" flex flex-row flex-wrap  items-center p-12 w-full max-w-screen-xl">
        <div className="relative">
          <img
            src={`${user.profilePic}`}
            className=" object-cover aspect-square rounded-2xl z-10 m-4 w-32 sm:w-36 md:w-44 lg:w-64 "
            alt="user-details-user"
          ></img>
          {user && loggedIn && loggedIn.id === user.id && (
            <button
              className=" bg-indigo-500 text-white font-bold uppercase p-2 lg:p-3 rounded-lg transition duration-200  active:bg-indigo-800 active:scale-90 montserrat absolute z-10 bottom-1 right-1
              text-xs sm:text-sm md:text-base"
              onClick={startBand}
            >
              Start Band
            </button>
          )}
        </div>

        <div className=" z-10">
          <h2 className=" mulish text-2xl">{user.username}</h2>
          <p className=" text-gray-500 font-bold montserrat">
            {user.city}, {user.state}
          </p>
        <div className="">
          {bands && Object.values(bands) && (
            <div className=" mulish text-2xl ">Member of </div>
          )}
          <div>
            {bands &&
              Object.values(bands).length > 0 &&
              Object.values(bands)
                .filter((b) => b.userId === user.id)
                .map((b, i) => (
                  <NavLink
                    className=" transition ease-in-out duration-200 hover:underline text-indigo-600 visited:text-indigo-800 font-bold montserrat"
                    to={`/bands/${b.id}`}
                  >
                    {b.name}
                  </NavLink>
                ))}
          </div>
        </div>
        </div>
      </div>
      <div className=" mb-6 border-b border-gray-600 text-gray-88 w-full max-w-screen-xl ">
        <span
          className={`hover:border-b-4 hover:border-indigo-600 cursor-pointer font-bold  ${
            !showBody ? " text-black border-black border-b-2" : "text-indigo-600"
          } `}
          onClick={() => setShowBody((prev) => !prev)}
        >
          collection {user.Purchases.length}
        </span>
        <span
          className={`hover:border-b-4 hover:border-indigo-600 cursor-pointer font-bold mx-8 ${
            showBody ? " text-black border-black border-b-2" : "text-indigo-600 "
          }`}
          onClick={() => setShowBody((prev) => !prev)}
        >
          wishlist {user.WishList.length}
        </span>
      </div>

      <div className="max-w-screen-xl w-full" ref={ulRef}>
        <div
          className={`max-w-screen-xl w-full flex flex-row flex-wrap gap-4 content-start ${
            !showBody ? "fade-in" : "hidden"
          }`}
        >
          {user.Purchases &&
            user.Purchases.length &&
            !showBody &&
            user.Purchases.map((a, i) => (
              <UserDetailsAlbum album={a} key={`userdetail${i}`} />
            ))}
        </div>
        <div
          className={`max-w-screen-xl w-full flex flex-row flex-wrap gap-4 content-start ${
            showBody ? "fade-in" : "hidden"
          }`}
        >
          {user.WishList &&
            user.WishList.length > 0 &&
            showBody &&
            user.WishList.map((album, i) => (
              <UserDetailsAlbum album={album} key={`userdetail${i}`} />
            ))}
        </div>
      </div>
    </div>
  );
}
