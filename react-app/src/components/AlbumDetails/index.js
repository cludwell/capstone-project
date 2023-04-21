import { useDispatch, useSelector } from 'react-redux'
import './AlbumDetails.css'
import { useEffect } from 'react'
import { fetchSingleAlbum } from '../../store/albums'
import { useParams } from 'react-router-dom'

export default function AlbumDetails() {
    const dispatch = useDispatch()
    const { albumId } = useParams()

    useEffect(() => {
        dispatch(fetchSingleAlbum(albumId))
    })
    const album = useSelector(state => state.albums.singleAlbum)
    console.log('================', album)
    if (!album || !Object.values(album).length) return null
    return (
        <div className='album-details-container'>
            <h1>lets get this started</h1>
            <h1>lets get this started</h1>
            <h1>lets get this started</h1>
            <h1>lets get this started</h1>
            <h1>lets get this started</h1>
            <h1>lets get this started</h1>
            <h1>lets get this started</h1>
            <div className='tracks-column'>

            </div>
            <div className='album-column'>

            {/* <img src={`${album.albumImage}`} alt='albumartwork' /> */}
            <div className='share-wishlist'>
                <span>Share/Embed</span>
                <span>
                <i className="fa-regular fa-heart navi-icons"/>Wishlist</span>
            </div>
            </div>
            <div className='band-info-column'>

            </div>
        </div>
    )
}
