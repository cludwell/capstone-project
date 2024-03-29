import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearAlbumState, fetchAlbums } from "../store/albums";
import NewAndNotable from "./NewAndNotable";
import { fetchAllPurchases } from "../store/purchases";
import UpcomingLiveStream from "./UpcomingLiveStream";
import { fetchUsers } from "../store/users";
import { NavLink } from "react-router-dom";
import { fetchWishLists } from "../store/wishlists";
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
  const user = useSelector((state) => state.session.user);
  const livestreamTimes = [
    ["today", "6:00 PM PST"],
    ["today", "10:00 PM PST"],
    ["tomorrow", "2:00 PM PST"],
    ["tomorrow", "8:00 PM PST"],
    ["in two days", "7:00 PM PST"],
  ];

  // const wishes = useSelector(state => state.wishes)
  if (!albums || !Object.values(albums).length) return null;
  console.log("ALBUMS", Object.values(albums));
  return (
    <>
      {!user ? (
        <div className="flex flex-col absolute bg-cyan-500 text-white text-center justify-center h-10 sm:h-12 md:h-14 w-full z-10 font-bold sm:text-lg md:text-xl lg:text-2xl ">
          We've updated our terms of use. Please sign in.
        </div>
      ) : null}
      <div className="justify-center mt-4 mx-2">
        <div className="flex flex-col sm:flex-row justify-center mx-auto drop-shadow-lg fade-in">
          <div className="relative w-full max-w-2xl">
            <h1 className="absolute text-white font-bold italic w-fit left-6 bottom-3 text-2xl text-shadow z-10">
              Introducing Juanita y los Feos
            </h1>
            <h2 className="absolute text-white font-bold italic z-10 w-fit left-6 bottom-12 text-xl text-shadow">
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

          <div className="relative flex flex-col ">
            <NavLink to={`/albums/${albums["9"].id}`} className="relative">
              <img
                src={`${albums["9"].albumImage}`}
                alt="first column"
                className="w-full sm:w-96 h-32 object-cover rounded-lg contrast-75 hover:contrast-100 transition ease-in-out duration-200 object-position-top"
              ></img>
              <h4 className="absolute z-10 font-bold italic bottom-1 sm:text-lg md:text-xl left-1 text-white text-shadow">
                Juanita y los Feos' Last Album
              </h4>
            </NavLink>
            <NavLink to={`/albums/${albums["6"].id}`} className="relative">
              <img
                src={`${albums["6"].albumImage}`}
                alt="second col item"
                className="w-full sm:w-96 h-32 object-cover rounded-lg contrast-75 hover:contrast-100 transition ease-in-out duration-200 object-position-top"
              ></img>
              <h4 className="absolute z-10 font-bold italic  bottom-4 sm:text-lg md:text-xl left-1 text-white text-shadow">
                Fellowship Carries DragonForce's Torch
              </h4>
            </NavLink>
            {albums && albums["10"] ? (
              <NavLink
                to={`/bands/${albums["10"].Band.id}`}
                className="relative"
              >
                <img
                  src={`${albums["10"].Band.artistImage}`}
                  alt="second col item"
                  className="w-full sm:w-96 h-32 object-cover rounded-lg contrast-75 hover:contrast-100 transition ease-in-out duration-200 object-position-top"
                ></img>
                <h4 className="absolute z-10 font-bold italic bottom-1 sm:text-lg md:text-xl left-1 text-white text-shadow">
                  UNLEASH THE ARCHERS
                </h4>
              </NavLink>
            ) : null}
          </div>
        </div>

        <h3 className=" text-center my-8 md:my-12 lg:my-16 sm:text-lg lg:text-xl fade-in">
          ✨Fans have paid artists billions using fancamp, and $190 billion in
          the last year✨
        </h3>
        <div className="flex flex-col items-center relative mx-auto max-w-screen-xl">

          <div>
            <h5 className=" mb-8 sm:text-lg lg:text-xl text-cyan-500 left-2">
              UPCOMING FANCAMP LIVE STREAMS
            </h5>
            <div className="flex flex-row gap-3 p-6 overflow-x-scroll overscroll-contain snap-x snap-center overflow-clip max-w-[90vw] xl:max-w-[1100px]">
              {[
                albums["14"],
                albums["5"],
                albums["7"],
                albums["11"],
                albums["15"],
              ].map(
                (album, i) =>
                  album && (
                    <UpcomingLiveStream
                      ele={livestreamTimes[i]}
                      album={album}
                      key={`livestream${i}`}
                    />
                  )
              )}
            </div>
          </div>
          {/* </div> */}

          <div>
            <h5 className="my-8 sm:text-lg lg:text-xl text-cyan-500 left-2">
              NEW AND NOTABLE
            </h5>

            <div className="flex flex-row gap-3 p-6 overflow-x-scroll overscroll-contain snap-x snap-center overflow-clip max-w-[90vw] xl:max-w-[1100px] ">
              {Object.values(albums)
                .reverse()
                .map((album, i) => (
                  <NewAndNotable album={album} key={`a${i}`} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
