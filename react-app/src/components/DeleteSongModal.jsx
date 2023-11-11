import { useDispatch, useSelector } from "react-redux";
import IconTrash from "./IconTrash";
import ModalString from "./ModalString";
import { deleteSongRequest } from "../store/songs";
import { fetchSingleAlbum } from "../store/albums";
import { useState } from "react";
export default function DeleteSongModal({ string, song }) {
  const dispatch = useDispatch();
  const album = useSelector((state) => state.albums.singleAlbum);
  const confirmDelete = async (e) => {
    await dispatch(deleteSongRequest(song));
    await dispatch(fetchSingleAlbum(album.id));
    setOpenId("");
  };
  const [openId, setOpenId] = useState("");
  return (
    <>
      <button
        className=" p-1 bg-emerald-600 text-white uppercase rounded-lg text-sm transition duration-200 ease-in-out montserrat active:bg-emerald-800 active:scale-90"
        onClick={() => setOpenId(string)}
      >
        <IconTrash classes={""} color={"currentColor"} />
      </button>
      <ModalString openId={openId} setOpenId={setOpenId} string={string}>
        <div className="w-96">
          <h2 className=" montserrat text-black">
            Are you sure you want to delete this song, {song}: {string}?
          </h2>
          <div className="flex flex-col">
            <button
              className="bg-teal-500 w-full my-2 p-3 uppercase montserrat rounded-lg active:scale-95 active:bg-teal-800 transition duration-200 ease-in-out text-lg text-white font-bold "
              onClick={confirmDelete}
            >
              Yes
            </button>
            <button
              className="bg-red-500 w-full my-2 p-3 uppercase montserrat rounded-lg active:scale-95 active:bg-red-800 transition duration-200 ease-in-out text-lg text-white font-bold "
              onClick={() => setOpenId("")}
            >
              No
            </button>
          </div>
        </div>
      </ModalString>
    </>
  );
}
