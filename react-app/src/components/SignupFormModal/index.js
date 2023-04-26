import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { useModal } from "../../context/Modal";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [ email, setEmail ] = useState("");
	const [ username, setUsername ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ confirmPassword, setConfirmPassword ] = useState("");
	const [ name, setName ] = useState('')
  	const [ address, setAddress ] = useState('')
  	const [ city, setCity ] = useState('')
  	const [ state, setState ] = useState('')
  	const [ country, setCountry ] = useState('')
  	const [ genre, setGenre ] = useState('')
  	const [ profilePic, setProfilePic ] = useState('')
  	const [ errors, setErrors ] = useState([]);
	const [ hasSubmitted, setHasSubmitted ] = useState(false)
	const { closeModal } = useModal()
	const validate = () => {
		const err = []
		if (!name || name.length < 3 ) err.push('Please enter a name more than 3 characters')
		if (!email || !email.includes('@')) err.push('Please enter a valid email')
		if (!password || password.length < 6) err.push('Please enter a valid password')
		if ( password !== confirmPassword ) err.push('Password and password confirmation do not match')
		if (!confirmPassword || confirmPassword.length < 6 ) err.push('Please enter a valid confirmation for password')
		if (!address || address.length < 4) err.push('Please enter a valid street address')
		if (!city || city.length < 4) err.push('Please enter a valid city')
		if (!state || state.length < 2) err.push('Please enter a valid state')
		if (!country || country.length < 2) err.push('Please enter a valid country')
		if (!genre) err.push('Please enter some interest genres')
		if (!profilePic || profilePic.length < 10) err.push('Please enter valid image url')
		setErrors(err)
		return err
	}
  	const handleSubmit = (e) => {
 	   e.preventDefault();
	   validate()
	   setHasSubmitted(true)
 	   if (!errors.length) {
			const newUser = { name, email, username, password, address, city, state, country, genre, profile_pic: profilePic }
 	       const data = dispatch(signUp(newUser));
 	       if (data) {
 	         setErrors(data)
			//   closeModal()
 	       }
 	   } else {
 	       return alert('Please correct input errors');
 	   }
	   closeModal()
	  };

  return (
    <div className="sign-up-form-modal">
      <h1 className="signup-title">Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <ul>
          {hasSubmitted && errors.length && errors.map((error, idx) =>(
		  <li className="errors" key={idx}>{error}</li>
		  ))}
        </ul>
		<div className="sign-up-container">
		<label className="sign-up-label">name</label>

		<div className="sign-up-col">
		<input className="sign-up-input" type="text" value={name} onChange={e=> setName(e.target.value)} ></input>
		</div>

		<label className="sign-up-label">email</label>

		<div className="sign-up-col">
		<input className="sign-up-input" type="email" value={email} onChange={e=> setEmail(e.target.value)}></input>
		</div>

		<label className="sign-up-label">username</label>

		<div className="sign-up-col">
		<input className="sign-up-input" type="text" value={username} onChange={e=> setUsername(e.target.value)}></input>
		</div>

		<label className="sign-up-label">address</label>

		<div className="sign-up-col">
		<input className="sign-up-input" type="text" value={address} onChange={e=> setAddress(e.target.value)}></input>
		</div>

		<label className="sign-up-label">city</label>

		<div className="sign-up-col">
		<input className="sign-up-input" type="text" value={city} onChange={e=> setCity(e.target.value)}></input>
		</div>

		<label className="sign-up-label">state</label>

		<div className="sign-up-col">
		<input className="sign-up-input" type="text" value={state} onChange={e=> setState(e.target.value)}></input>
		</div>

		<label className="sign-up-label">country</label>

		<div className="sign-up-col">
		<input className="sign-up-input" type="text" value={country} onChange={e=> setCountry(e.target.value)}></input>
		</div>
		<label className="sign-up-label">genres you enjoy</label>

		<div className="sign-up-col">
		<input className="sign-up-input" type="text" value={genre} onChange={e=> setGenre(e.target.value)}></input>
		</div>


		<label className="sign-up-label">profile pic</label>

		<div className="sign-up-col">
		<input className="sign-up-input" type="url" value={profilePic} onChange={e=> setProfilePic(e.target.value)}></input>
		</div>

		<label className="sign-up-label">password</label>

		<div className="sign-up-col">
		<input className="sign-up-input" type="text" value={password} onChange={e=> setPassword(e.target.value)}></input>
		</div>

		<label className="sign-up-label">confirm password</label>

		<div className="sign-up-col">
		<input className="sign-up-input" type="text" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></input>
		</div>
		</div>

        <button type="submit" className="sign-up-submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
