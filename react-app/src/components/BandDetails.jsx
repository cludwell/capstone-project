import { NavLink, useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBandCommand,
  fetchAllBands,
  fetchBandInfo,
} from "../store/bands";
import { authenticate } from "../store/session";

export default function BandDetails() {
  const { bandId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchBandInfo(bandId));
      await dispatch(authenticate());
    };
    loadData();
  }, [dispatch, bandId]);

  const band = useSelector((state) => state.bands.singleBand);
  const user = useSelector((state) => state.session.user);
  if (!band) return null;

  const addAlbum = (e) => {
    history.push(`/bands/${band.id}/newAlbum`);
  };
  const deleteBand = async (e) => {
    await dispatch(deleteBandCommand(bandId));
    await dispatch(fetchAllBands());
    history.push(`/users/${user.id}`);
  };
  const editOnClick = async (e) => {
    history.push(`/bands/edit/${band.id}`);
  };
  const rgbaParser = (str) =>
    `rgba(${parseInt(str.slice(1, 3), 16)}, ${parseInt(
      str.slice(3, 5),
      16
    )}, ${parseInt(str.slice(5), 16)}, 0.8)`;

  return (
    <div
      className="flex flex-col align-center items-center min-h-screen p-2 "
      style={
        band.backgroundImage && band.tiled
          ? {
              backgroundImage: `url(${band.backgroundImage})`,
            }
          : band.backgroundImage && !band.tiled
          ? {
              backgroundImage: `url(${band.backgroundImage})`,
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
            }
          : band.backgroundColor
          ? {
              backgroundColor: band.backgroundColor,
            }
          : null
      }
    >
      <div
        className="flex flex-row max-w-screen-lg w-full rounded-xl fade-in my-12"
        style={{
          backgroundColor: band.backgroundColorSecondary
            ? rgbaParser(band.backgroundColorSecondary)
            : null,
          color: band.textColor ? band.textColor : null,
        }}
      >
        <div className="flex flex-row flex-wrap content-start gap-4 mt-8 ml-8 mr-4 w-full ">
          {band && band.Albums && band.Albums.length ? (
            band.Albums.map((a, i) => (
              <NavLink
                className="w-36 sm:w-40 md:w-44 "
                key={`card${i}`}
                to={`/albums/${a.id}`}
              >
                <img
                  src={`${a.albumImage}`}
                  alt="albumart"
                  key={`albumart${i}`}
                  className=" object-cover rounded-md aspect-square w-36 sm:w-40 md:w-44 "
                ></img>
                <p className=" font-bold">{a.name}</p>
              </NavLink>
            ))
          ) : (
            <h2>Nothing here yet</h2>
          )}
        </div>
        <div className="mt-8 mr-8 mb-8 w-52">
          <img
            className="aspect-square rounded-md w-fit object-cover"
            alt="bandimagealbumdetails"
            src={`${band.artistImage}`}
          />
          <div className=" mulish font-bold">{band.name}</div>
          <div className=" montserrat">{band.country}</div>
          <p className=" text-slate-500">{band.city}</p>
          {user && band.userId === user.id ? (
            <>
              <button
                className=" bg-teal-500 w-full my-1 p-1 uppercase mulish rounded-lg active:scale-95 active:bg-teal-800 transition duration-200 ease-in-out text-sm"
                onClick={editOnClick}
              >
                Edit Band
              </button>
              <button
                className=" bg-teal-500 w-full my-1 p-1 uppercase mulish rounded-lg active:scale-95 active:bg-teal-800 transition duration-200 ease-in-out text-sm"
                onClick={addAlbum}
              >
                Add Album
              </button>
              <button
                className=" bg-teal-500 w-full my-1 p-1 uppercase mulish rounded-lg active:scale-95 active:bg-teal-800 transition duration-200 ease-in-out text-sm"
                onClick={deleteBand}
              >
                Break Up Band
              </button>
            </>
          ) : null}
          <p className=" text-xs mb-4">{band.description}</p>
          <p className=" my-2">
            {" "}
            <a
              className=" text-indigo-600 visited:text-indigo-800"
              href={`https://www.facebook.com/search/top/?q=${band.name
                .split(" ")
                .join("%20")}`}
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>{" "}
          </p>

          <p className=" my-2">
            <a
              className=" text-indigo-600 visited:text-indigo-800"
              href={`https://www.youtube.com/results?search_query=${band.name
                .split(" ")
                .join("+")} band`}
              target="_blank"
              rel="noreferrer"
            >
              YouTube
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
