import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { fetchBandInfo } from "../store/bands";
import { createAlbumRequest } from "../store/albums";
import IconExclamation from "./Icons/IconExclamation";
export default function AlbumFormPost() {
  const { bandId } = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [albumImage, setAlbumImage] = useState(null);
  const [genre, setGenre] = useState("");
  const [youtube, setYoutube] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  useEffect(() => {
    const err = {};
    if (!name || name.length < 3 || name.length > 40)
      err.name = "Please enter a valid name, between 3 and 40 characters.";
    if (!description || description.length < 30)
      err.description = "Please enter a description of your album";
    if (!genre || genre.length < 3)
      err.genre =
        "Please enter some genres your album could be categorized under";
    if (!price || price < 0)
      err.price = "Please enter a valid price for your album";
    if (!albumImage)
      err.albumImage = "Please enter a valid image for your album";
    if (!youtube.includes("youtu"))
      err.youtube = "Are you sure that's a youtube link?";
    setErrors(err);
    return err;
  }, [name, description, genre, price, albumImage, youtube]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (Object.values(errors).length)
      return alert("Please correct input errors");
    else {
      const newAlbum = {
        name,
        price,
        album_image: albumImage,
        genre,
        band_id: parseInt(bandId),
        description,
        youtube,
      };
      dispatch(createAlbumRequest(newAlbum));
      dispatch(fetchBandInfo(bandId)); //need state to refresh on bandinfo page
      history.push(`/bands/${bandId}`);
    }
  };

  useEffect(() => {
    dispatch(fetchBandInfo(bandId));
  }, [dispatch, bandId]);

  const user = useSelector((state) => state.session.user);
  const band = useSelector((state) => state.bands.singleBand);

  if (!user || !band || user.id !== band.userId) return null;

  return (
    <div className="flex flex-col  mx-4 my-16 items-center min-h-screen fade-in">
      <h1 className="text-cyan-500 text-center font-bold thasadith text-2xl mb-8">
        Your New Album
      </h1>
      <div className="flex flex-col justify-center">
        <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
          <label className=" text-cyan-500 thasadith font-bold text-xl">
            Name
          </label>

          <div className="post-album-input-col">
            <input
              className=" rounded-lg focus:outline-double focus:outline-cyan-500 focus:outline-[4px] focus:border-white border-solid border-[1.5px] border-slate-300 transition-all ease-in-out duration-200 bg-slate-100 p-2 w-full"
              type="text"
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
            Description
          </label>

          <div className="post-album-input-col">
            <textarea
              className=" rounded-lg focus:outline-double focus:outline-cyan-500 focus:outline-[4px] focus:border-white border-solid border-[1.5px] border-slate-300 transition-all ease-in-out duration-200 bg-slate-100 p-2 w-full"
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {hasSubmitted && errors.description ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                <IconExclamation />
                {errors.description}
              </p>
            ) : (
              <p></p>
            )}
          </div>

          <label className=" text-cyan-500 thasadith font-bold text-xl">
            Price
          </label>

          <div className="post-album-input-col">
            <input
              className=" rounded-lg focus:outline-double focus:outline-cyan-500 focus:outline-[4px] focus:border-white border-solid border-[1.5px] border-slate-300 transition-all ease-in-out duration-200 bg-slate-100 p-2 w-full"
              type="number"
              min={0}
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
            Album Image
          </label>

          <div className="post-album-input-col">
            <input
              className=" "
              type="file"
              name="album_image"
              accept="image/*"
              onChange={(e) => setAlbumImage(e.target.files)}
            ></input>
            {hasSubmitted && errors.albumImage ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                <IconExclamation />
                {errors.albumImage}
              </p>
            ) : (
              <p></p>
            )}
          </div>

          <label className=" text-cyan-500 thasadith font-bold text-xl">
            Genre
          </label>

          <div className="post-album-input-col">
            <input
              className=" rounded-lg focus:outline-double focus:outline-cyan-500 focus:outline-[4px] focus:border-white border-solid border-[1.5px] border-slate-300 transition-all ease-in-out duration-200 bg-slate-100 p-2 w-full"
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            ></input>
            {hasSubmitted && errors.genre ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                <IconExclamation />
                {errors.genre}
              </p>
            ) : (
              <p></p>
            )}
          </div>

          <label className=" text-cyan-500 thasadith font-bold text-xl">
            Youtube
          </label>

          <div className="post-album-input-col">
            <input
              className=" rounded-lg focus:outline-double focus:outline-cyan-500 focus:outline-[4px] focus:border-white border-solid border-[1.5px] border-slate-300 transition-all ease-in-out duration-200 bg-slate-100 p-2 w-full"
              type="text"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
            ></input>
            {hasSubmitted && errors.youtube ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                <IconExclamation />
                {errors.youtube}
              </p>
            ) : (
              <p></p>
            )}
          </div>
        </form>
        <button
          type="submit"
          className="bg-teal-500 p-3 uppercase montserrat rounded-lg active:scale-95 active:bg-teal-800 transition duration-200 ease-in-out text-lg text-white font-bold w-fit px-12 self-center my-12"
          onClick={handleSubmit}
        >
          Submit Album
        </button>
      </div>
    </div>
  );
}
