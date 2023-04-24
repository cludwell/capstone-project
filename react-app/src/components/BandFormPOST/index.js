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
    const [ artistImage, setArtistImage ] = useState('')
    const [ bannerUrl, setBannerUrl ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ genres, setGenres ] = useState('')
    const [ errors, setErrors] = useState({})
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    useEffect(() => {
        const err = {}
        if (!name || name.length < 3) err.name = 'Please enter a valid name, and of at least 3 characters.'
        if (!city || city.length < 3) err.city = 'Please enter a valid city. It helps local fans find you'
        if (!state || state.length < 2) err.state = 'Please enter a valid state, it helps local fans find you'
        if (!country || country.length < 2) err.country = 'Please enter a valid country'
        if (artistImage.length < 20) err.artistImage = 'Please enter a valid image url'
        if (bannerUrl.length < 20) err.bannerUrl = 'Please enter a valid image url'
        if (!description || description.length < 30) err.description = 'Please enter a description of your band'
        if (!genres || genres.length < 3) err.genres = 'Please enter some genres you could be categorized under'
        setErrors(err)
    }, [name, city, state, country, artistImage, bannerUrl, description, genres])

    const handleSubmit = async e => {
        e.preventDefault();
        if (Object.values(errors).length) {
            console.log(errors)
            return;
        }
        const newBand = {name, city, state, country, artist_image: artistImage, banner_url: bannerUrl, description, genres}
        await dispatch(startBand(newBand))
        history.push(`/users/${user.id}`)
    }


    return (
    <div className='post-band-form-page'>
    <h3 className='post-band-title'>Unnamed Band</h3>

    <div className='post-band-form-container'>
    <form className='post-band-form'>

    <label className='post-band-label'>Name</label>
    <input type='text' className='post-band-text-input'
    value={name} onChange={e => setName(e.target.value)}></input>

    <label className='post-band-label'>City</label>
    <input type='text' className='post-band-text-input'
    value={city} onChange={e=> setCity(e.target.value)}></input>

    <label className='post-band-label'>State</label>
    <input type='text' className='post-band-text-input'
    value={state} onChange={e => setState(e.target.value)}></input>

    <label className='post-band-label'>Country</label>
    <input type='text' className='post-band-text-input'
    value={country} onChange={e=> setCountry(e.target.value)}></input>

    <label className='post-band-label'>Band Photo</label>
    <input type='text' className='post-band-text-input'
    value={bannerUrl} onChange={e => setBannerUrl(e.target.value)}></input>

    <label className='post-band-label'>Banner or Logo</label>
    <input type='text' className='post-band-text-input'
    value={artistImage} onChange={e => setArtistImage(e.target.value)}></input>

    <label className='post-band-label'>description</label>
    <textarea className='post-band-input textarea'
    value={description} onChange={e=> setDescription(e.target.value)}></textarea>

    <label className='post-band-label'>Genre</label>
    <input type='text' className='post-band-text-input'
    value={genres} onChange={e => setGenres(e.target.value)}></input>

    <button className='post-band-submit' type='submit' onClick={handleSubmit}>Submit Band</button>
    </form>
    </div>
    </div>
    )
}
