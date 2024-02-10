// import './BandFormPut.css'
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editBandRequest, fetchBandInfo } from "../store/bands";
import IconExclamation from "./Icons/IconExclamation";
export default function BandFormPut() {
  const { bandId } = useParams();
  const bandState = useSelector((state) => state.bands.singleBand);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [artistImage, setArtistImage] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [tiled, setTiled] = useState(false);
  const [description, setDescription] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [backgroundColorSecondary, setBackgroundColorSecondary] = useState("");
  const [textColor, setTextColor] = useState("");
  const [genres, setGenres] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  const validate = () => {
    const err = {};
    if (!name || name.length < 3 || name.length > 40)
      err.name = "Please enter a valid name, between 3 and 40 characters.";
    if (!city || city.length < 3 || city.length > 40)
      err.city =
        "Please enter a valid city between 3 and 40 characters. It helps local fans find you.";
    if (!state || state.length < 2 || state.length > 40)
      err.state =
        "Please enter a valid state between 3 and 40 characters, it helps local fans find you.";
    if (!country || country.length < 2 || country.length > 40)
      err.country = "Please enter a valid country between 3 and 40 characters.";
    if (!artistImage) err.artistImage = "Please submit a band photo";
    if (!bannerUrl) err.bannerUrl = "Please submit a band logo for your banner";
    if (!description || description.length < 30)
      err.description =
        "Please enter a description of your band, at least 30 characters.";
    if (!genres || genres.length < 3)
      err.genres = "Please enter some genres you could be categorized under.";
    if (backgroundColorSecondary === textColor)
      err.textColor =
        "Text color and secondary background color must be different to read text!";
    setErrors(err);
    return err;
  };

  useEffect(() => {
    setName(bandState && bandState.name ? bandState.name : "");
    setCity(bandState && bandState.city ? bandState.city : "");
    setState(bandState && bandState.state ? bandState.state : "");
    setBannerUrl(bandState && bandState.bannerUrl ? bandState.bannerUrl : null);
    setCountry(bandState && bandState.country ? bandState.country : "");
    setArtistImage(
      bandState && bandState.artistImage ? bandState.artistImage : null
    );
    setDescription(
      bandState && bandState.description ? bandState.description : ""
    );
    setGenres(bandState && bandState.genres ? bandState.genres : "");
    setBackgroundColor(
      bandState && bandState.backgroundColor ? bandState.backgroundColor : ""
    );
    setBackgroundColorSecondary(
      bandState && bandState.backgroundColorSecondary
        ? bandState.backgroundColorSecondary
        : ""
    );
    setTextColor(bandState && bandState.textColor ? bandState.textColor : "");
    setBackgroundImage(
      bandState && bandState.backgroundImage ? bandState.backgroundImage : null
    );
    setTiled(bandState && bandState.tiled ? bandState.tiled : false);
  }, [bandState]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    validate();
    if (Object.values(errors).length) return;
    else {
      const data = {
        name,
        city,
        state,
        country,
        description,
        genres,
        artist_image: artistImage,
        banner_url: bannerUrl,
        background_image: backgroundImage,
        tiled,
        background_color: backgroundColor,
        background_color_secondary: backgroundColorSecondary,
        text_color: textColor,
      };
      await dispatch(editBandRequest(data, bandId));
      await dispatch(fetchBandInfo(bandId));
      history.push(`/users/${user.id}`);
    }
  };

  return (
    <div className="flex flex-col  mx-4 items-center fade-in">

      <div className="max-w-screen-lg my-8">
      <h3 className="text-cyan-500 text-center font-bold thasadith text-2xl mb-8">Previously {bandState.name}</h3>
        <form className=" grid grid-cols-2 gap-2">
          <label className=" text-cyan-500 thasadith font-bold text-xl">
            Name
          </label>

          <div className=" ">
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
            City
          </label>

          <div className=" ">
            <input
              type="text"
              className=" rounded-lg focus:outline-double focus:outline-cyan-500 focus:outline-[4px] focus:border-white border-solid border-[1.5px] border-slate-300 transition-all ease-in-out duration-200 bg-slate-100 p-2 w-full"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></input>
            {hasSubmitted && Object.values(errors).length ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                <IconExclamation />
                {errors.city}
              </p>
            ) : (
              <p></p>
            )}
          </div>

          <label className=" text-cyan-500 thasadith font-bold text-xl">
            State
          </label>

          <div className=" ">
            <input
              type="text"
              className=" rounded-lg focus:outline-double focus:outline-cyan-500 focus:outline-[4px] focus:border-white border-solid border-[1.5px] border-slate-300 transition-all ease-in-out duration-200 bg-slate-100 p-2 w-full"
              value={state}
              onChange={(e) => setState(e.target.value)}
            ></input>
            {hasSubmitted && Object.values(errors).length ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                <IconExclamation />
                {errors.state}
              </p>
            ) : (
              <p></p>
            )}
          </div>

          <label className=" text-cyan-500 thasadith font-bold text-xl">
            country
          </label>

          <div className=" ">
            <input
              type="text"
              className=" rounded-lg focus:outline-double focus:outline-cyan-500 focus:outline-[4px] focus:border-white border-solid border-[1.5px] border-slate-300 transition-all ease-in-out duration-200 bg-slate-100 p-2 w-full"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></input>
            {hasSubmitted && Object.values(errors).length ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                <IconExclamation />
                {errors.country}
              </p>
            ) : (
              <p></p>
            )}
          </div>

          <label className=" text-cyan-500 thasadith font-bold text-xl">
            Band Photo
          </label>

          <div className=" ">
            <input
              type="file"
              className=""
              accept="image/*"
              name="banner_url"
              onChange={(e) => setBannerUrl(e.target.files)}
            ></input>
            {hasSubmitted && Object.values(errors).length ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                <IconExclamation />
                {errors.bannerUrl}
              </p>
            ) : (
              <p></p>
            )}
          </div>

          <label className=" text-cyan-500 thasadith font-bold text-xl">
            Banner or Logo
          </label>

          <div className=" ">
            <input
              type="file"
              className=""
              accept="image/*"
              name="artist_image"
              onChange={(e) => setArtistImage(e.target.files)}
            ></input>
            {hasSubmitted && Object.values(errors).length ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                <IconExclamation />
                {errors.artistImage}
              </p>
            ) : (
              <p></p>
            )}
          </div>

          <label className=" text-cyan-500 thasadith font-bold text-xl">
            Background Image
          </label>

          <div className=" ">
            <input
              type="file"
              className=""
              accept="image/*"
              name="background_image"
              onChange={(e) => setBackgroundImage(e.target.files)}
            ></input>
            {hasSubmitted && Object.values(errors).length ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                <IconExclamation />
                {errors.backgroundImage}
              </p>
            ) : (
              <p></p>
            )}
          </div>

          <label className=" text-cyan-500 thasadith font-bold text-xl">
            Tile Background Image
          </label>

          <div className=" ">
            <input
              type="checkbox"
              className=" rounded-lg focus:outline-double focus:outline-cyan-500 focus:outline-[4px] focus:border-white border-solid border-[1.5px] border-slate-300 transition-all ease-in-out duration-200 bg-slate-100 h-8 w-8"
              value={tiled}
              name="background_image"
              onChange={(e) => setTiled(e.target.value)}
            ></input>
            {hasSubmitted && Object.values(errors).length ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                <IconExclamation />
                {errors.tiled}
              </p>
            ) : (
              <p></p>
            )}
          </div>

          <label className=" text-cyan-500 thasadith font-bold text-xl">
            Background Color
          </label>

          <div className=" ">
            <input
              type="color"
              className=" rounded-lg focus:outline-double focus:outline-cyan-500 focus:outline-[4px] focus:border-white border-solid border-[1.5px] border-slate-300 transition-all ease-in-out duration-200 bg-slate-100 "
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            ></input>
            {hasSubmitted && Object.values(errors).length ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                <IconExclamation />
                {errors.backgroundColor}
              </p>
            ) : (
              <p></p>
            )}
          </div>

          <label className=" text-cyan-500 thasadith font-bold text-xl">
            Secondary Background Color
          </label>

          <div className=" ">
            <input
              type="color"
              className=" rounded-lg focus:outline-double focus:outline-cyan-500 focus:outline-[4px] focus:border-white border-solid border-[1.5px] border-slate-300 transition-all ease-in-out duration-200 bg-slate-100 "
              value={backgroundColorSecondary}
              onChange={(e) => setBackgroundColorSecondary(e.target.value)}
            ></input>
            {hasSubmitted && Object.values(errors).length ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                <IconExclamation />
                {errors.backgroundColorSecondary}
              </p>
            ) : (
              <p></p>
            )}
          </div>

          <label className=" text-cyan-500 thasadith font-bold text-xl">
            Text Color
          </label>

          <div className=" ">
            <input
              type="color"
              className=" rounded-lg focus:outline-double focus:outline-cyan-500 focus:outline-[4px] focus:border-white border-solid border-[1.5px] border-slate-300 transition-all ease-in-out duration-200 bg-slate-100 "
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            ></input>
            {hasSubmitted && Object.values(errors).length ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                <IconExclamation />
                {errors.textColor}
              </p>
            ) : (
              <p></p>
            )}
          </div>

          <label className=" text-cyan-500 thasadith font-bold text-xl">
            Description
          </label>

          <div className=" ">
            <textarea
              className=" rounded-lg focus:outline-double focus:outline-cyan-500 focus:outline-[4px] focus:border-white border-solid border-[1.5px] border-slate-300 transition-all ease-in-out duration-200 bg-slate-100 p-2 h-40 scroll slim-scrollbar w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {hasSubmitted && Object.values(errors).length ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                <IconExclamation />
                {errors.description}
              </p>
            ) : (
              <p></p>
            )}
          </div>

          <label className=" text-cyan-500 thasadith font-bold text-xl">
            Genre
          </label>

          <div className=" ">
            <input
              type="text"
              className="post-band-text-input"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
            ></input>
            {hasSubmitted && Object.values(errors).length ? (
              <p className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3">
                <IconExclamation />
                {errors.genres}
              </p>
            ) : (
              <p></p>
            )}
          </div>
          <div></div>
          <button
            className="bg-green-500 text-white font-bold uppercase p-3 rounded-lg transition duration-200  active:bg-green-800 active:scale-90 montserrat mt-8 w-40"
            type="submit"
            onClick={handleSubmit}
          >
            Submit Band
          </button>
        </form>
      </div>
    </div>
  );
}
