import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearAlbumState, fetchAlbums } from "../store/albums";
import NewAndNotable from "./NewAndNotable";
import { fetchAllPurchases } from "../store/purchases";
import UpcomingLiveStream from "./UpcomingLiveStream";
import { fetchUsers } from "../store/users";
import { NavLink } from "react-router-dom";
import { fetchWishLists } from "../store/wishlists";
import Footer from "./Footer";
import { clearBandState } from "../store/bands";

export default function Landing() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      await dispatch(clearAlbumState());
      await dispatch(clearBandState());
      await dispatch(fetchAlbums());
      await dispatch(fetchAllPurchases());
      await dispatch(fetchUsers());
      await dispatch(fetchWishLists());
    };
    loadData();
  }, [dispatch]);

  const albums = useSelector((state) => state.albums.allAlbums);
  // const user = useSelector((state) => state.session.user);
  const livestreamTimes = [
    ["today", "6:00 PM PST"],
    ["today", "10:00 PM PST"],
    ["tomorrow", "2:00 PM PST"],
    ["tomorrow", "8:00 PM PST"],
    ["in two days", "7:00 PM PST"],
  ];

  // const wishes = useSelector(state => state.wishes)
  if (!albums || !Object.values(albums).length) return null;

  return (
    <div className="justify-center mt-1 mx-2">
      {/* {!user ? (
        <div className="flex flex-col absolute bg-cyan-500 text-white text-center justify-center h-10 sm:h-12 md:h-14 w-full z-10 font-bold sm:text-lg md:text-xl lg:text-2xl">
          We've updated our terms of use. Please sign in.
        </div>
      ) : null} */}

      <div className="flex flex-col sm:flex-row justify-center ">
        <div className="relative w-full max-w-2xl">
          <h1 className=" absolute text-white font-bold italic z-10 group-hover:z-30 w-fit left-6 top-72 text-2xl">
            Introducing Juanita y los Feos
          </h1>
          <h2 className="absolute text-white font-bold italic z-10 w-fit left-6 top-80 text-xl">
            New Wave Punk Rockers from Madrid
          </h2>
          <NavLink to={`/bands/${albums["8"].bandId}`}>
            <img
              className=" w-full h-96 object-cover relative transition ease-in-out duration-200 rounded-lg contrast-75 hover:contrast-100"
              src={`${albums["8"].Band.artistImage}`}
              alt="main-banner-land"
            ></img>
          </NavLink>
        </div>

        <div className="relative flex flex-col">
          <NavLink to={`/albums/${albums["9"].id}`} className="relative">
            <img
              src={`${albums["9"].albumImage}`}
              alt="first column"
              className="w-full sm:w-96 h-32 object-cover rounded-lg contrast-75 hover:contrast-100 transition ease-in-out duration-200 object-position-top"
            ></img>
            <h4 className="absolute z-10 font-bold italic bottom-1 sm:text-lg md:text-xl left-1 ">
              Juanita y los Feos' Last Album
            </h4>
          </NavLink>
          <NavLink to={`/albums/${albums["6"].id}`} className="relative">
            <img
              src={`${albums["6"].albumImage}`}
              alt="second col item"
              className="w-full sm:w-96 h-32 object-cover rounded-lg contrast-75 hover:contrast-100 transition ease-in-out duration-200 object-position-top"
            ></img>
            <h4 className="absolute z-10 font-bold italic  bottom-4 sm:text-lg md:text-xl left-1 ">
              Fellowship Carries DragonForce's Torch
            </h4>
          </NavLink>
          {albums && albums["10"] ? (
            <NavLink to={`/bands/${albums["10"].Band.id}`} className="relative">
              <img
                src={`${albums["10"].Band.artistImage}`}
                alt="second col item"
                className="w-full sm:w-96 h-32 object-cover rounded-lg contrast-75 hover:contrast-100 transition ease-in-out duration-200 object-position-top"
              ></img>
              {/* <h4 className="absolute z-10 font-bold italic top-1 sm:text-lg md:text-2xl left-1 ">
              Vancouver's Champions of Metal
            </h4> */}
              <h4 className="absolute z-10 font-bold italic bottom-1 sm:text-lg md:text-xl left-1 ">
                UNLEASH THE ARCHERS
              </h4>
            </NavLink>
          ) : null}
        </div>
      </div>

      <h3 className=" text-center my-8 md:my-12 lg:my-16 sm:text-lg lg:text-xl">
        ✨Fans have paid artists billions using fancamp, and $190 billion in the
        last year✨
      </h3>
      <div className="flex flex-col items-center relative">
        <div>
          <h5 className=" my-8 sm:text-lg lg:text-xl text-cyan-500 left-2">
            UPCOMING FANCAMP LIVE STREAMS
          </h5>
          <div className="flex flex-row flex-wrap gap-3">
            {[
              albums["14"],
              albums["5"],
              albums["7"],
              albums["11"],
              albums["15"],
            ].map((album, i) =>
              album ? (
                <UpcomingLiveStream
                  ele={livestreamTimes[i]}
                  album={album}
                  key={`livestream${i}`}
                />
              ) : null
            )}
          </div>
        </div>
        {/* </div> */}

        <div>
          <h5 className="my-8 sm:text-lg lg:text-xl text-cyan-500 left-2">
            NEW AND NOTABLE
          </h5>

          <div className="flex flex-row flex-wrap gap-3">
            {Object.values(albums)
              .reverse()
              .map((album, i) => <NewAndNotable album={album} key={`a${i}`} />)
              .slice(0, 5)}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
