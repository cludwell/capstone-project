import { useState } from "react";
import Modal from "./Modal";
import IconExclamation from "./IconExclamation";
import { signUp } from "../store/session";
import { fetchUserCart } from "../store/carts";
import { useDispatch } from "react-redux";

export default function SignUpModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const validate = () => {
    const err = [];
    if (!name || name.length < 3 || name.length > 50)
      err.push("Please enter a name between 3 and 50 characters");
    if (!email || !email.includes("@")) err.push("Please enter a valid email");
    if (!password || password.length < 6)
      err.push("Please enter a valid password");
    if (password !== confirmPassword)
      err.push("Password and password confirmation do not match");
    if (!confirmPassword || confirmPassword.length < 6)
      err.push("Please enter a valid confirmation for password");
    if (!address || address.length < 4)
      err.push("Please enter a valid street address");
    if (!city || city.length < 4) err.push("Please enter a valid city");
    if (!state || state.length < 2) err.push("Please enter a valid state");
    if (!country || country.length < 2)
      err.push("Please enter a valid country");
    if (!genre) err.push("Please enter some interest genres");
    if (!image) err.push("Please upload a profile picture");
    setErrors(err);
    return err;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();
    setHasSubmitted(true);
    if (!errors.length) {
      const newUser = {
        name,
        email,
        username,
        password,
        address,
        city,
        state,
        country,
        genre,
        image,
        profile_pic: image,
      };
      const data = await dispatch(signUp(newUser));
      if (data) setErrors(data);
      else {
        await dispatch(fetchUserCart());
        setOpen(false);
      }
    } else {
      return alert("Please correct input errors");
    }
  };
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-indigo-500 text-white font-bold uppercase p-3 rounded-lg transition duration-200  active:bg-indigo-800 active:scale-90 montserrat "
      >
        Sign Up
      </button>
      <Modal open={open} setOpen={setOpen}>
        <h1 className="text-center text-xl font-bold mb-6 montserrat">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <ul>
            {hasSubmitted && Array.isArray(errors) && errors.length ? (
              errors.map((error, i) => (
                <li
                  key={`error${i}`}
                  className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3"
                >
                  <IconExclamation /> {error}
                </li>
              ))
            ) : typeof errors === "string" ? (
              <li className="errors">{errors}</li>
            ) : (
              Object.values(errors).map((error, i) => (
                <li
                  key={`error${i}`}
                  className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3"
                >
                  <IconExclamation /> {error}
                </li>
              ))
            )}
          </ul>
          <div className="grid grid-cols-2 gap-4">
            <label className=" text-cyan-700 thasadith font-bold text-xl">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className=" rounded-lg border-solid border-cyan-500 transition ease-in-out duration-200 bg-slate-100 p-2"
            />
            <label className=" text-cyan-700 thasadith font-bold text-xl">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className=" rounded-lg border-solid border-cyan-500 transition ease-in-out duration-200 bg-slate-100 p-2"
            />
            <label className=" text-cyan-700 thasadith font-bold text-xl">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className=" rounded-lg border-solid border-cyan-500 transition ease-in-out duration-200 bg-slate-100 p-2"
            />
            <label className=" text-cyan-700 thasadith font-bold text-xl">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className=" rounded-lg border-solid border-cyan-500 transition ease-in-out duration-200 bg-slate-100 p-2"
            />
            <label className=" text-cyan-700 thasadith font-bold text-xl">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className=" rounded-lg border-solid border-cyan-500 transition ease-in-out duration-200 bg-slate-100 p-2"
            />
            <label className=" text-cyan-700 thasadith font-bold text-xl">
              State
            </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className=" rounded-lg border-solid border-cyan-500 transition ease-in-out duration-200 bg-slate-100 p-2"
            />
            <label className=" text-cyan-700 thasadith font-bold text-xl">
              Country
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className=" rounded-lg border-solid border-cyan-500 transition ease-in-out duration-200 bg-slate-100 p-2"
            />
            <label className=" text-cyan-700 thasadith font-bold text-xl">
              Favorite Genres
            </label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
              className=" rounded-lg border-solid border-cyan-500 transition ease-in-out duration-200 bg-slate-100 p-2"
            />
            <label className=" text-cyan-700 thasadith font-bold text-xl">
              Profile Pic
            </label>
            <input
              className="sign-up-input"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <label className=" text-cyan-700 thasadith font-bold text-xl">
              Password
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className=" rounded-lg border-solid border-cyan-500 transition ease-in-out duration-200 bg-slate-100 p-2"
            />
            <label className=" text-cyan-700 thasadith font-bold text-xl">
              Confirm Password
            </label>
            <input
              type="text"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className=" rounded-lg border-solid border-cyan-500 transition ease-in-out duration-200 bg-slate-100 p-2"
            />
          </div>
          <button
              type="submit"
              className="bg-green-500 text-white font-bold uppercase p-3 rounded-lg transition duration-200  active:bg-green-800 active:scale-90 montserrat mt-8 w-40"
            >
              Sign Up
            </button>
        </form>
      </Modal>
    </>
  );
}
