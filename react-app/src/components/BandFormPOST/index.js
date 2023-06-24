import { useHistory } from 'react-router-dom'
import './BandFormPOST.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { startBand } from '../../store/bands'

export default function BandFormPOST() {

    const dispatch = useDispatch()
    const [ name, setName ] = useState('')
    const [ city, setCity ] = useState('')
    const [ state, setState ] = useState('')
    const [ country, setCountry ] = useState('')
    const [ artistImage, setArtistImage ] = useState(null)
    const [ bannerUrl, setBannerUrl ] = useState(null)
    const [ backgroundImage, setBackgroundImage ] = useState(null)
    const [ description, setDescription ] = useState('')
    const [ backgroundColor, setBackgroundColor ] = useState('')
    const [ genres, setGenres ] = useState('')
    const [ errors, setErrors] = useState({})
    const [ hasSubmitted, setHasSubmitted ] = useState(false)
    const user = useSelector(state => state.session.user)
    const history = useHistory()

    useEffect(() => {
        const err = {}
        if (!name || name.length < 3 || name.length >40) err.name = 'Please enter a valid name, between 3 and 40 characters.'
        if (!city || city.length < 3 || city.length > 40) err.city = 'Please enter a valid city between 3 and 40 characters. It helps local fans find you.'
        if (!state || state.length < 2 || state.length > 40) err.state = 'Please enter a valid state between 3 and 40 characters, it helps local fans find you.'
        if (!country || country.length < 2 || country.length > 40) err.country = 'Please enter a valid country between 3 and 40 characters.'
        if (!artistImage) err.artistImage = 'Please submit a band photo'
        if (!bannerUrl) err.bannerUrl = 'Please submit a band logo for your banner'
        if (!description || description.length < 30) err.description = 'Please enter a description of your band.'
        if (!genres || genres.length < 3) err.genres = 'Please enter some genres you could be categorized under.'
        setErrors(err)
        return err
    }, [name, city, state, country, artistImage, bannerUrl, description, genres])

    const handleSubmit = e => {
        e.preventDefault();
        setHasSubmitted(true)
        if (Object.values(errors).length) return;
        else {
            const newBand = {name, city, state, country, artist_image: artistImage, banner_url: bannerUrl, description, genres, background_image: backgroundImage}
            dispatch(startBand(newBand))
            history.push(`/users/${user.id}`)
        }
    }


    return (
    <div className='post-band-form-page'>
    <h3 className='post-band-title'>your new band</h3>

    <div className='post-band-form-container'>
    <form className='post-band-form' onSubmit={handleSubmit}>

    <label className='post-band-label'>name</label>

    <div className='band-post-input-col'>
    <input type='text' className='post-band-text-input'
    value={name} onChange={e => setName(e.target.value)}></input>
    {hasSubmitted && Object.values(errors).length ? (
        <p className='errors'>{errors.name}</p>
    ) : (
        <p></p>
    )}
    </div>

    <label className='post-band-label'>city</label>

    <div className='band-post-input-col'>
    <input type='text' className='post-band-text-input'
    value={city} onChange={e=> setCity(e.target.value)}></input>
    {hasSubmitted && Object.values(errors).length ? (
        <p className='errors'>{errors.city}</p>
    ) : (
        <p></p>
    )}
    </div>

    <label className='post-band-label'>state</label>

    <div className='band-post-input-col'>
    <input type='text' className='post-band-text-input'
    value={state} onChange={e => setState(e.target.value)}></input>
    {hasSubmitted && Object.values(errors).length ? (
        <p className='errors'>{errors.state}</p>
    ) : (
        <p></p>
    )}
    </div>

    <label className='post-band-label'>country</label>

    <div className='band-post-input-col'>
    <input type='text' className='post-band-text-input'
    value={country} onChange={e=> setCountry(e.target.value)}></input>
    {hasSubmitted && Object.values(errors).length ? (
        <p className='errors'>{errors.country}</p>
    ) : (
        <p></p>
    )}
    </div>

    <label className='post-band-label'>band photo</label>

    <div className='band-post-input-col'>
    <input type='file' className='post-band-text-input'
    accept='image/*' name='banner_url' onChange={e => setBannerUrl(e.target.files)} ></input>
    {hasSubmitted && Object.values(errors).length ? (
    <p className='errors'>{errors.bannerUrl}</p>
    ) : (
        <p></p>
    )}
    </div>

    <label className='post-band-label'>banner or logo</label>

    <div className='band-post-input-col'>
    <input type='file' className='post-band-text-input'
    accept='image/*' name='artist_image' onChange={e => setArtistImage(e.target.files)} ></input>
    {hasSubmitted && Object.values(errors).length ? (
        <p className='errors'>{errors.artistImage}</p>
    ) : (
        <p></p>
    )}
    </div>

    <label className='post-band-label'>background image</label>

    <div className='band-post-input-col'>
    <input type='file' className='post-band-text-input'
    accept='image/*' name='background_image' onChange={e => setBackgroundImage(e.target.files)} ></input>
    {hasSubmitted && Object.values(errors).length ? (
        <p className='errors'>{errors.backgroundImage}</p>
    ) : (
        <p></p>
    )}
    </div>

    <label className='post-band-label'>background color</label>

    <div className='band-post-input-col'>
    <input type='color' className='post-band-text-input'
    value={backgroundColor} onChange={e => setBackgroundColor(e.target.value)}></input>
    {hasSubmitted && Object.values(errors).length ? (
        <p className='errors'>{errors.backgroundColor}</p>
    ) : (
        <p></p>
    )}
    </div>

    <label className='post-band-label'>description</label>

    <div className='band-post-input-col'>
    <textarea className='post-band-input textarea'
    value={description} onChange={e=> setDescription(e.target.value)}></textarea>
    {hasSubmitted && Object.values(errors).length ? (
        <p className='errors'>{errors.description}</p>
    ) : (
        <p></p>
    )}
    </div>

    <label className='post-band-label'>genre</label>

    <div className='band-post-input-col'>
    <input type='text' className='post-band-text-input'
    value={genres} onChange={e => setGenres(e.target.value)}></input>
    {hasSubmitted && Object.values(errors).length ? (
        <p className='errors'>{errors.genres}</p>
    ) : (
        <p></p>
    )}
    </div>

        <div></div>
    <button className='post-band-submit' type='submit' onClick={handleSubmit}>Submit Band</button>
    </form>
    </div>
    </div>
    )
}
