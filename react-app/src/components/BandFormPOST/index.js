import { useHistory } from 'react-router-dom'
import './BandFormPOST.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

export default function BandFormPOST() {

    const hisotry = useHistory()
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

    useEffect(() => {
        const err = {}
        if (!name || name.length < 3) err.name = 'Please enter a valid name, and of at least 3 characters.'
        if (!city || city.length) err.city = 'Please enter a valid city. It helps local fans find you'
        if (!state || state.length < 2) err.state = 'Please enter a valid state, it helps local fans find you'
        if (!country || country.length < 2) err.country = 'Please enter a valid country'
        if (!artistImage.length.includes('.png') || !artistImage.length.includes('.jpg') || !artistImage.length.includes('.jpeg') || !artistImage.length.includes('www.')) err.artistImage = 'Please enter a valid image url'
        if (!bannerUrl.length.includes('.png') || !bannerUrl.length.includes('.jpg') || !bannerUrl.length.includes('.jpeg') || !bannerUrl.length.includes('www.')) err.bannerUrl = 'Please enter a valid image url'
        if (!description || description.length < 30) err.description = 'Please enter a description of your band'
        if (!genres || genres.length < 3) err.genres = 'Please enter some genres you could be categorized under'
        setErrors(err)
    }, [name, city, hisotry, state, country, artistImage, bannerUrl, description, genres])

    const handleSubmit = async e => {
        e.preventDefault();
        if (Object.values(errors).length) return;
        const newBand = {name, city, state, country, artist_image: artistImage, banner_url: bannerUrl, description, genres}
        await dispatch(something(newBand))
    }

    
    return (
    <div className='post-band-form-page'>
    <h3 className='post-band-title'>Unnamed Band</h3>

    <div className='post-band-form-container'>
    <form className='post-band-form'>

    <label className='post-band-label'>Name</label> <input type='text' className='post-band-text-input'></input>
    <label className='post-band-label'>City</label><input type='text' className='post-band-text-input'></input>
    <label className='post-band-label'>State</label><input type='text' className='post-band-text-input'></input>
    <label className='post-band-label'>Country</label><input type='text' className='post-band-text-input'></input>
    <label className='post-band-label'>Band Photo</label><input type='text' className='post-band-text-input'></input>
    <label className='post-band-label'>Banner or Logo</label><input type='text' className='post-band-text-input'></input>
    <label className='post-band-label'>description</label><textarea className='post-band-input textarea'></textarea>
    <label className='post-band-label'>Genre</label><input type='text' className='post-band-text-input'></input>

    <button className='post-band-submit' type='submit' onClick={handleSubmit}></button>
    </form>
    </div>
    </div>
    )
}
