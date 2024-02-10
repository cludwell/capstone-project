import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postSongRequest } from "../store/songs";
import { fetchSingleAlbum } from "../store/albums";
import IconExclamation from "./Icons/IconExclamation";
import { useModal } from "../context/Modal";

export default function SongPostModal({ albumId }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [price, setPrice] = useState(0);
  const [trackNum, setTrackNum] = useState(0);
  const [url, setUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const {closeModal} = useModal();
  useEffect(() => {
    const err = {};
    if (!name || name.length > 40)
      err.name = "Please enter a title for your song less than 40 characters";
    if (!price || price < 0 || price > 100)
      err.price = "Please enter a realistic price for your song";
    if (!trackNum || trackNum < 0 || trackNum > 100)
      err.trackNum = "Please keep track numbers between 0 and 100";
    setErrors(err);
    return err;
  }, [name, price, trackNum, url]);

  const handleSubmit = async (e) => {
    setHasSubmitted(true);
    if (Object.values(errors).length) return;
    else {
      const newSong = {
        name,
        lyrics,
        price: parseFloat(price),
        track_num: parseInt(trackNum),
        url,
        album_id: parseInt(albumId),
      };
      await dispatch(postSongRequest(newSong, albumId));
      await dispatch(fetchSingleAlbum(albumId));
      closeModal();
    }
  };
  return (
    <>
        <div className=" text-black">
          <h3 className="thasadith text-2xl text-cyan-500 font-bold text-center mb-8">
            Add a Song to Album
          </h3>

          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <div className="grid grid-cols-[150px_1fr] gap-3">
              <label className=" text-cyan-500 thasadith font-bold text-xl">
                Name
              </label>

              <div className="post-song-col">
                <input
                  type="text"
                  className=" rounded-lg focus:outline-double focus:outline-cyan-500 focus:outline-[4px] focus:border-white border-solid border-[1.5px] border-slate-300 transition-all ease-in-out duration-200 bg-slate-100 p-2 w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
                {hasSubmitted && errors.name ? (
                  <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                    <IconExclamation />
                    {errors.name}
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
              <label className=" text-cyan-500 thasadith font-bold text-xl">
                Lyrics
              </label>

              <div className="post-song-col">
                <textarea
                  type="textarea"
                  className=" rounded-lg focus:outline-double focus:outline-cyan-500 focus:outline-[4px] focus:border-white border-solid border-[1.5px] border-slate-300 transition-all ease-in-out duration-200 bg-slate-100 p-2 h-40 scroll slim-scrollbar w-full"
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value)}
                ></textarea>
                {hasSubmitted && errors.lyrics ? (
                  <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                    <IconExclamation />
                    {errors.lyrics}
                  </p>
                ) : (
                  <p></p>
                )}
              </div>

              <label className=" text-cyan-500 thasadith font-bold text-xl">
                price
              </label>

              <div className="post-song-col">
                <input
                  type="number"
                  className=" rounded-lg focus:outline-double focus:outline-cyan-500 focus:outline-[4px] focus:border-white border-solid border-[1.5px] border-slate-300 transition-all ease-in-out duration-200 bg-slate-100 p-2 w-full"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
                {hasSubmitted && errors.price ? (
                  <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                    <IconExclamation />
                    {errors.price}
                  </p>
                ) : (
                  <p></p>
                )}
              </div>

              <label className=" text-cyan-500 thasadith font-bold text-xl">
                Track Number
              </label>

              <div className="post-song-col">
                <input
                  type="number"
                  className=" rounded-lg focus:outline-double focus:outline-cyan-500 focus:outline-[4px] focus:border-white border-solid border-[1.5px] border-slate-300 transition-all ease-in-out duration-200 bg-slate-100 p-2 w-full"
                  value={trackNum}
                  onChange={(e) => setTrackNum(e.target.value)}
                  min={0}
                  max={100}
                ></input>
                {hasSubmitted && errors.trackNum ? (
                  <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                    <IconExclamation />
                    {errors.trackNum}
                  </p>
                ) : (
                  <p></p>
                )}
              </div>

              <label className=" text-cyan-500 thasadith font-bold text-xl">
                Url
              </label>

              <div className="post-song-col">
                <input
                  type="file"
                  name="url"
                  accept="audio/*"
                  className=""
                  onChange={(e) => setUrl(e.target.files)}
                ></input>
                {hasSubmitted && errors.url ? (
                  <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                    <IconExclamation />
                    {errors.url}
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="bg-green-500 text-white font-bold uppercase p-3 rounded-lg transition duration-200  active:bg-green-800 active:scale-90 montserrat mt-8 w-40"
              onClick={handleSubmit}
            >
              submit song
            </button>
          </form>
        </div>
    </>
  );
}
