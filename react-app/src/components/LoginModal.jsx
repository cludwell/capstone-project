import { useState } from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { fetchUserCart } from "../store/carts";
import { login } from "../store/session";
import IconExclamation from "./Icons/IconExclamation";

export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userData;
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      await dispatch(fetchUserCart());
      setOpen(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const demoUser = async (e) => {
    const data = await dispatch(login("unleash@aa.io", "password"));
    if (data) {
      setErrors(data);
    } else {
      await dispatch(fetchUserCart());
      setOpen(false);
    }
  };
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-green-500 text-white font-bold uppercase p-3 rounded-lg transition duration-200  active:bg-green-800 active:scale-90 montserrat mr-8 "
      >
        log in
      </button>
      <Modal open={open} setOpen={setOpen}>
        <h1 className="text-center text-xl font-bold mb-6 montserrat">Login</h1>
        <form onSubmit={handleSubmit} className="p-5">
          <ul>
            {errors.map((error, i) => (
              <li
                key={`error${i}`}
                className=" w-full bg-red-300 text-red-950 rounded-2xl my-3 flex flex-row p-3 fade-in"
              >
                <IconExclamation /> {error}
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-4">
            <label
              className=" text-cyan-500 thasadith font-bold text-xl"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              required
              className=" rounded-lg focus:outline-double focus:outline-cyan-500 focus:outline-[4px] focus:border-white border-solid border-[1.5px] border-slate-300 transition-all ease-in-out duration-200 bg-slate-100 p-2"
            />
            <label className=" text-cyan-500 thasadith font-bold text-xl">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              required
              className=" rounded-lg focus:outline-double focus:outline-cyan-500 focus:outline-[4px] focus:border-white border-solid border-[1.5px] border-slate-300 transition-all ease-in-out duration-200 bg-slate-100 p-2"
            />
          </div>
          <div className="flex flex-row justify-around mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white font-bold uppercase p-3 rounded-lg transition duration-200  active:bg-green-800 active:scale-90 montserrat"
            >
              Log In
            </button>
            <button
              className="bg-indigo-500 text-white font-bold uppercase p-3 rounded-lg transition duration-200  active:bg-indigo-800 active:scale-90 montserrat"
              onClick={demoUser}
            >
              Demo User
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
