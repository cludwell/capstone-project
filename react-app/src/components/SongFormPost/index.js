import { useParams } from 'react-router-dom'
import './SongFormPost.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postSongRequest } from '../../store/songs'
import { fetchSingleAlbum } from '../../store/albums'

export default function SongFormPost() {
    const dispatch = useDispatch()
    const { albumId } = useParams()
    const [ name, setName ] = useState('')
    const [ lyrics, setLyrics ] = useState('')
    const [ price, setPrice ] = useState(0)
    const [ trackNum, setTrackNum ] = useState(0)
    const [ url, setUrl ] = useState('')
    const [ errors, setErrors ] = useState({})
    const [ hasSubmitted, setHasSubmitted ] = useState(false)
    const validate = () => {
        const err = {}
        if (!name) err.name = 'Please enter a title for your song'
        if (!price || price < 0 || price > 100) err.price = 'Please enter a realistic price for your song'
        if (!trackNum || trackNum < 0  || trackNum > 100) err.trackNum = 'Please keep track numbers between 0 and 100'
        if (!url) err.url = 'Please provide a path to upload your song'
        setErrors(err)
        return err
    }

    const handleSubmit = e => {
        e.preventDefault();
        validate()
        setHasSubmitted(true)
        if (Object.values(errors).length) return alert('Please correct input errors')
        else {
            const newSong = { name, lyrics, price, track_num: trackNum, url }
            dispatch(postSongRequest(newSong, albumId))
            dispatch(fetchSingleAlbum(albumId))
        }
    }

    return (
        <div className='post-song-form-page'>
        <h3 className='post-song-title'>add a song to album</h3>

        <form className='post-song-form'>
        <div className='post-song-form-grid'>
        <label className='post-song-label'>name</label>

        <div className='post-song-col'>
        <input type='text' className='post-song-input'></input>
        {hasSubmitted && !Object.values(errors).length ? (
        <p className='errors'>{errors.name}</p>
        ) : (
        <p></p>
        )}
        </div>
        <label className='post-song-label'>name</label>

        <div className='post-song-col'>
        <input type='text' className='post-song-input'></input>
        {hasSubmitted && !Object.values(errors).length ? (
        <p className='errors'>{errors.name}</p>
        ) : (
        <p></p>
        )}
        </div>

        <label className='post-song-label'>name</label>

        <div className='post-song-col'>
        <input type='text' className='post-song-input'></input>
        {hasSubmitted && !Object.values(errors).length ? (
        <p className='errors'>{errors.name}</p>
        ) : (
        <p></p>
        )}
        </div>

        <label className='post-song-label'>name</label>

        <div className='post-song-col'>
        <input type='text' className='post-song-input'></input>
        {hasSubmitted && !Object.values(errors).length ? (
        <p className='errors'>{errors.name}</p>
        ) : (
        <p></p>
        )}
        </div>

        <label className='post-song-label'>name</label>

        <div className='post-song-col'>
        <input type='text' className='post-song-input'></input>
        {hasSubmitted && !Object.values(errors).length ? (
        <p className='errors'>{errors.name}</p>
        ) : (
        <p></p>
        )}
        </div>


        </div>

        <button type='submit' className='post-song-submit' onClick={handleSubmit}>submit song</button>

        </form>

        </div>
    )
}
