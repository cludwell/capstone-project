import { useDispatch, useSelector } from 'react-redux'
import './AlbumDetails.css'
import { useEffect, useRef, useState } from 'react'
import { fetchSingleAlbum } from '../../store/albums'
import { useParams } from 'react-router-dom'
import { fetchUserPurchases } from '../../store/purchases'
import OpenModalButton from '../OpenModalButton'
import LyricsModal from '../LyricsModal'

export default function AlbumDetails() {
    const dispatch = useDispatch()
    const { albumId } = useParams()
    //modal components
    const [ showMenu, setShowMenu ] = useState(false)
    const ulRef = useRef();
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }
    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = e => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu])
    const closeMenu = e => setShowMenu(false)

    useEffect(() => {
        dispatch(fetchSingleAlbum(albumId))
        dispatch(fetchUserPurchases())
    }, [dispatch])

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
            <p className='details-band-name'>by {album.Band.name}</p>
            <div className='details-react-player'>REACT placeholder</div>
            <div className='album-details-streaming-info'>
                <h4 className='details-info'>Digital Album</h4>
                <p className='details-grey-text'>Streaming + Download</p>

                <table className='album-track-table'>
                    {album.Songs.map(s => (
                        <tr>
                            <td>{s.trackNum}. </td>
                            <td>{s.name}</td>
                            <td>{s.lyrics ? (
                                <OpenModalButton
                                buttonText={'lyrics'}
                                onItemClick={closeMenu}
                                modalComponent={<LyricsModal lyrics={s.lyrics}/>} />
                            ) : null}</td>
                        </tr>
                    ))}

                </table>
                <p className='details-ownership-info'>Includes unlimited streaming via the free Bandcamp app, plus high-quality download in MP3, FLAC and more.</p>

            </div>

            <p className='album-details-description'>{album.description}</p>
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
                <img className='album-details-band-img' alt='bandimagealbumdetails' src={`${album.Band.artistImage}`} />
            </div>

        </div>
        </div>
    )
}
