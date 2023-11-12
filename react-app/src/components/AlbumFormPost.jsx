import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { fetchBandInfo } from "../store/bands";
import { createAlbumRequest } from "../store/albums";
import IconExclamation from "./IconExclamation";
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
    <div className="album-post-form-container">
      <h1 className="album-post-title">your new album</h1>
      <div className="album-post-wrapper">
        <form className="album-post-form" onSubmit={handleSubmit}>
          <label className="post-album-label">name</label>

          <div className="post-album-input-col">
            <input
              className="post-album-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            {hasSubmitted && errors.name ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3"
              >
                <IconExclamation />{errors.name}</p>
            ) : (
              <p></p>
            )}
          </div>

          <label className="post-album-label">description</label>

          <div className="post-album-input-col">
            <textarea
              className="post-album-input textarea"
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {hasSubmitted && errors.description ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3"
              >
                <IconExclamation />{errors.description}</p>
            ) : (
              <p></p>
            )}
          </div>

          <label className="post-album-label">price</label>

          <div className="post-album-input-col">
            <input
              className="post-album-input"
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
            {hasSubmitted && errors.price ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3"
              >
                <IconExclamation />{errors.price}</p>
            ) : (
              <p></p>
            )}
          </div>

          <label className="post-album-label">album image</label>

          <div className="post-album-input-col">
            <input
              className="post-album-input"
              type="file"
              name="album_image"
              accept="image/*"
              onChange={(e) => setAlbumImage(e.target.files)}
            ></input>
            {hasSubmitted && errors.albumImage ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3"
              >
                <IconExclamation />{errors.albumImage}</p>
            ) : (
              <p></p>
            )}
          </div>

          <label className="post-album-label">genre</label>

          <div className="post-album-input-col">
            <input
              className="post-album-input"
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            ></input>
            {hasSubmitted && errors.genre ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3"
              >
                <IconExclamation />{errors.genre}</p>
            ) : (
              <p></p>
            )}
          </div>

          <label className="post-album-label">youtube</label>

          <div className="post-album-input-col">
            <input
              className="post-album-input"
              type="text"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
            ></input>
            {hasSubmitted && errors.youtube ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3"
              >
                <IconExclamation />{errors.youtube}</p>
            ) : (
              <p></p>
            )}
          </div>

          <div></div>
          <button
            type="submit"
            className="post-album-submit"
            onClick={handleSubmit}
          >
            Submit Album
          </button>
        </form>
      </div>
    </div>
  );
}
