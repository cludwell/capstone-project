import { useDispatch, useSelector } from 'react-redux'
import './AlbumFormPost'
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

export default function AlbumFormPost() {
    const { bandId } = useParams()
    const dispatch = useDispatch();
    const [ name, setName ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ price, setPrice ] = useState(0)
    const [ albumImage, setAlbumImage ] = useState('')
    const [ genre, setGenre ] = useState('')
    const [ hasSubmitted, setHasSubmitted ] = useState(false)
    const [ errors, setErrors ] = useState({})
    const history = useHistory()

    const validate = () => {
        const err = {}
        if (!name || name.length < 3) err.name = 'Please enter a valid name, and of at least 3 characters.'
        if (!description || description.length < 30) err.description = 'Please enter a description of your album'
        if (!genre || genre.length < 3) err.genres = 'Please enter some genres your album could be categorized under'
        if (!price || price < 0) err.price = 'Please enter a valid price for your album'
        if (!albumImage || albumImage.length < 20) err.albumImage = 'Please enter a valid image for your album'
        setErrors(err)
        return err
    }

    const handleSubmit = e => {
        e.preventDefault()
        validate()
        setHasSubmitted(true)
        if (Object.values(errors).length) return alert('Please correct input errors')
        else {
            const newAlbum = { name, price, album_image: albumImage, genre, band_id: bandId, description}
            dispatch( (newAlbum))
            history.push(`/bands/${bandId}`)
        }
    }
    const user = useSelector(state => state.session.user)
    const band = useSelector(state => state.bands.singleBand)

    if (!user || !band || user.id !== band.userId) return null
    return (
        <div className='album-post-form-container'>
        <h1 className='album-post-title'>your new album</h1>
        <div className='album-post-wrapper'>
        <form className='album-post-form'>

        <label className='post-album-label'>name</label>

        <div className='post-album-input-col'>
        <input className='post-album-input' type='text'></input>
        {hasSubmitted && Object.values(errors).length ? (
        <p className='errors'>{errors.name}</p>
            ) : (
        <p></p>
        )}
        </div>


        <label className='post-album-label'>description</label>

        <div className='post-album-input-col'>
        <textarea className='post-album-input' type='textarea'></textarea>
        {hasSubmitted && Object.values(errors).length ? (
        <p className='errors'>{errors.description}</p>
            ) : (
        <p></p>
        )}
        </div>


        <label className='post-album-label'>price</label>

        <div className='post-album-input-col'>
        <input className='post-album-input' type='number'></input>
        {hasSubmitted && Object.values(errors).length ? (
        <p className='errors'>{errors.price}</p>
            ) : (
        <p></p>
        )}
        </div>


        <label className='post-album-label'>album image</label>

        <div className='post-album-input-col'>
        <input className='post-album-input' type='text'></input>
        {hasSubmitted && Object.values(errors).length ? (
        <p className='errors'>{errors.albumImage}</p>
            ) : (
        <p></p>
        )}
        </div>


        <label className='post-album-label'>genre</label>

        <div className='post-album-input-col'>
        <input className='post-album-input' type='text'></input>
        {hasSubmitted && Object.values(errors).length ? (
        <p className='errors'>{errors.genre}</p>
            ) : (
        <p></p>
        )}
        </div>


        <button type='submit'>Submit Album</button>
        </form>
        </div>
        </div>
    )
}
