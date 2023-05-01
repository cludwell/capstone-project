// import { useParams } from 'react-router-dom'
import './SongFormPost.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { postSongRequest } from '../../store/songs'
import { fetchSingleAlbum } from '../../store/albums'
import { useModal } from '../../context/Modal'

export default function SongFormPost({ albumId }) {
    const dispatch = useDispatch()
    const [ name, setName ] = useState('')
    const [ lyrics, setLyrics ] = useState('')
    const [ price, setPrice ] = useState(0)
    const [ trackNum, setTrackNum ] = useState(0)
    const [ url, setUrl ] = useState('')
    const [ errors, setErrors ] = useState({})
    const { closeModal } = useModal()
    const [ hasSubmitted, setHasSubmitted ] = useState(false)
    useEffect(() => {
        const err = {}
        if (!name) err.name = 'Please enter a title for your song'
        if (!price || price < 0 || price > 100) err.price = 'Please enter a realistic price for your song'
        if (!trackNum || trackNum < 0  || trackNum > 100) err.trackNum = 'Please keep track numbers between 0 and 100'
        if (!url) err.url = 'Please provide a path to upload your song'
        setErrors(err)
        return err
    }, [name, price, trackNum, url])

    const handleSubmit = async e => {
        e.preventDefault();
        setHasSubmitted(true)
        if (Object.values(errors).length) return alert('Please correct input errors')
        else {
            const newSong = { name, lyrics, price: parseFloat(price), track_num: parseInt(trackNum), url, album_id: parseInt(albumId) }
            await dispatch(postSongRequest(newSong, albumId))
            await dispatch(fetchSingleAlbum(albumId))
            closeModal()
        }
    }

    return (
        <div className='post-song-form-page'>
        <h3 className='post-song-title'>add a song to album</h3>

        <form className='post-song-form' onSubmit={handleSubmit}>
        <div className='post-song-form-grid'>
        <label className='post-song-label'>name</label>

        <div className='post-song-col'>
        <input type='text' className='post-song-input' value={name} onChange={e => setName(e.target.value)}></input>
        {hasSubmitted && errors.name ? (
        <p className='errors'>{errors.name}</p>
        ) : (
        <p></p>
        )}
        </div>
        <label className='post-song-label'>lyrics</label>

        <div className='post-song-col'>
        <textarea type='textarea' className='post-song-input post-song-lyrics' value={lyrics} onChange={e => setLyrics(e.target.value)}></textarea>
        {hasSubmitted && errors.lyrics ? (
        <p className='errors'>{errors.lyrics}</p>
        ) : (
        <p></p>
        )}
        </div>

        <label className='post-song-label'>price</label>

        <div className='post-song-col'>
        <input type='number' className='post-song-input' value={price} onChange={e=> setPrice(e.target.value)}></input>
        {hasSubmitted && errors.price ? (
        <p className='errors'>{errors.price}</p>
        ) : (
        <p></p>
        )}
        </div>

        <label className='post-song-label'>track number</label>

        <div className='post-song-col'>
        <input type='number' className='post-song-input' value={trackNum} onChange={e=> setTrackNum(e.target.value)} min={0} max={100}></input>
        {hasSubmitted && errors.trackNum ? (
        <p className='errors'>{errors.trackNum}</p>
        ) : (
        <p></p>
        )}
        </div>

        <label className='post-song-label'>url</label>

        <div className='post-song-col'>
        <input type='url' className='post-song-input' value={url} onChange={e=> setUrl(e.target.value)}></input>
        {hasSubmitted && errors.url ? (
        <p className='errors'>{errors.url}</p>
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
