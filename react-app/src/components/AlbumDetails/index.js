import { useDispatch, useSelector } from 'react-redux'
import './AlbumDetails.css'
import { useEffect } from 'react'
import { fetchSingleAlbum } from '../../store/albums'
import { useParams } from 'react-router-dom'
import { fetchUserPurchases } from '../../store/purchases'

export default function AlbumDetails() {
    const dispatch = useDispatch()
    const { albumId } = useParams()

    useEffect(() => {
        dispatch(fetchSingleAlbum(albumId))
        dispatch(fetchUserPurchases())
    })

    const album = useSelector(state => state.albums.singleAlbum)
    console.log('================', album)
    if (!album || !Object.values(album).length) return null
    return (
        <div className='album-details-page'>
            {album.Band.bannerUrl ? (
                <img src={`${album.Band.bannerUrl}`} alt='bandbannerimage' className='album-details-banner'/>
            ) : null}
        <div className='album-details-container'>

            <div className='tracks-column'>
            <h2 className='album-details-title'>{album.name}</h2>
            <hp>by {album.Band.name}</hp>
            <div className='details-react-player'>placeholder</div>
            <div className='details-streaming-info'>
                <h4 className='details-info'>Digital Album</h4>
                <p className='details-grey-text'>Streaming + Download</p>
                <p className='details-ownership-info'>Includes unlimited streaming via the free Bandcamp app, plus high-quality download in MP3, FLAC and more.</p>

            </div>
            </div>


            <div className='album-column'>

            <img src={`${album.albumImage}`} alt='albumartwork' className='album-details-artwork'/>
            <div className='share-wishlist'>
                <span>Share/Embed</span>
                <span>
                <i className="fa-regular fa-heart navi-icons"/>Wishlist</span>
            </div>
            </div>



            <div className='band-info-column'>

            </div>

        </div>
        </div>
    )
}
