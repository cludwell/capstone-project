import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAlbums } from "../store/albums";
import { NavLink } from "react-router-dom";

export default function UserDetailsAlbum({ album }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);
  const albums = useSelector((state) => state.albums.allAlbums);
  if (!albums) return null;
  return (
    <NavLink
      to={`/albums/${album.Album.id}`}
      className="w-36  sm:w-40 md:w-48 lg:56 "
    >
      <div className="">
        <img
          src={`${album.Album.albumImage}`}
          alt="user-deets-album"
          className=" object-cover rounded-lg w-36  sm:w-40 md:w-48 lg:56 aspect-square"
        ></img>
        <div className="">
          <div className="font-bold montserrat text-sm sm:text-base">{album.Album.name}</div>
          <div className=" montserrat text-sm sm:text-base"> by {album.Band.name}</div>
        </div>

        <div className="montserrat text-xs sm:text-sm mt-8">
          appears in
          <span className=" text-blue-600 montserrat text-xs sm:text-sm ">
            {" "}
            {albums[album.Album.id] &&
            albums[album.Album.id].Sales &&
            albums[album.Album.id].Sales.length
              ? albums[album.Album.id].Sales.length
              : "no"}{" "}
             collections
          </span>
        </div>
      </div>
    </NavLink>
  );
}
