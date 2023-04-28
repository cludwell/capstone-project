import { useDispatch, useSelector } from 'react-redux'
import './AlbumDetails.css'
import { useEffect, useRef, useState } from 'react'
import { deleteAlbumRequest, fetchAlbums, fetchSingleAlbum } from '../../store/albums'
import { useHistory, useParams } from 'react-router-dom'
import { fetchUserPurchases } from '../../store/purchases'
import OpenModalButton from '../OpenModalButton'
import LyricsModal from '../LyricsModal'
import { NavLink } from 'react-router-dom'
import { fetchUsers } from '../../store/users'
import WishListFormPost from '../WishListFormPost'
import { deleteWishRequest, fetchWishLists } from '../../store/wishlists'
import { fetchBandInfo } from '../../store/bands'
import SongFormPost from '../SongFormPost'
import OpenModalSong from '../OpenModalButton/OpenModalSong'
import SongFormPut from '../SongFormPut'

export default function AlbumDetails() {
    const dispatch = useDispatch()
    const { albumId } = useParams()
    const history = useHistory()
    //modal components
    const [ showMenu, setShowMenu ] = useState(false)
    const ulRef = useRef();
    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = e => {
            if (!ulRef.current?.contains(e.target)) {
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
        dispatch(fetchAlbums())
        dispatch(fetchUsers())
        dispatch(fetchWishLists())
    }, [dispatch, albumId])

    const album = useSelector(state => state.albums.singleAlbum)
    const albums = useSelector(state => state.albums.allAlbums)
    const users = useSelector(state => state.users)
    const user = useSelector(state => state.session.user)
    const wishes = useSelector(state => state.wishes.userWishes)

    if (!album || !Object.values(album).length || !albums || !Object.values(albums).length || !users) return null
    const editAlbum = e => {
        history.push(`/albums/${album.id}/edit`)
    }
    const deleteAlbum = async e => {
        await dispatch(deleteAlbumRequest(album.id))
        await dispatch(fetchBandInfo(album.bandId))
        history.push(`/bands/${album.bandId}`)
    }

    const deleteWish = async e => {
        const wishId = wishes.find(w=> w.albumId === album.id && w.userId === user.id).id
        await dispatch(deleteWishRequest(wishId))
        await dispatch(fetchUsers())
        await dispatch(fetchWishLists())
    }
    const pleaseLogin = e => alert('Please log in to create a wishlist!')
    return (
        <div className='album-details-page'>
            {album.Band && album.Band.bannerUrl ? (
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
                    {album && album.Songs && album.Songs.length ? album.Songs.sort((a,b) => a.trackNum - b.trackNum).map((s, i) => (
                <tr key={`tr${i}`}>

                <td key={`td${i}`}></td>
                <td key={`td2${i}`}>{s.trackNum}. </td>
                <td key={`td3${i}`}>{s.name}</td>
                <td key={`td4${i}`}>{s.lyrics ? (
                <OpenModalButton
                key={`modallyric${i}`}
                buttonText={'lyrics'}
                onItemClick={closeMenu}
                modalComponent={<LyricsModal lyrics={s.lyrics}/>} />
                ) : null}</td>
                {user && album.Band.userId === user.id ? (
                    <OpenModalButton
                    key={`modaleditsong${i}`}
                    buttonText={'Edit'}
                    onItemClick={closeMenu}
                    modalComponent={<SongFormPut albumId={album.id} song= {s} />} />
                ) : null}
                </tr>
                    )) : null}

                </table>
                <p className='details-ownership-info'>Includes unlimited streaming via the free fancamp app, plus high-quality download in MP3, FLAC and more.</p>

            </div>

            <p className='album-details-description'>{album.description}</p>
            </div>


            <div className='album-column'>

            <img src={`${album.albumImage}`} alt='albumartwork' className='album-details-artwork'/>
            <div className='share-wishlist'>
                <span></span>



            {!user ? (
                //if the user is not signed in, they should be prompted to sign in
             <span className='logged-out-wishlist' onClick={pleaseLogin}>
             <i className="fa-regular fa-heart notwislist-list"/>
            WishList
             </span>
                //
            ) : user && users[user.id].Purchases && users[user.id].Purchases.some(p => p.albumId === album.id ) ? (
            //if user is signed in and owns item already
            <span>
            <i className="fa-solid fa-heart purchased-list"/>
           You Own This
            </span>
            ) : user && !wishes.some(w=> w.albumId === album.id) ? (
            <>
            <WishListFormPost album={album} />WishList
            </>
            ) : (
            <span onClick={deleteWish}>
            <i className="fa-solid fa-heart wished-for-list"/>
                WishList</span>
            )}




            </div>
            <div className='details-supporters'>
                {album.Sales.length ? album.Sales.map((s,i) => (
            <NavLink to={`/users/${s.userId}`} key={`${i}`}>
            <img src={`${s.User.profilePic}`} alt={`usersupporter${i}`} className='details-supporter'></img>
            </NavLink>
                )) : null}
            </div>
            </div>



            <div className='band-info-column'>
            <img className='album-details-band-img' alt='bandimagealbumdetails' src={`${album.Band.artistImage}`} />
            <p className='album-deets-country'>{album.Band.country}</p>
            <p className='album-deets-city'>{album.Band.city}</p>

            {user && album.Band.userId === user.id && album.bandId === album.Band.id && (
                <div className='user-auth-buttons'>
                <button className='band-deets-user-auth' onClick={editAlbum}>Edit Album</button>
                <button className='band-deets-user-auth' onClick={deleteAlbum}>Delete Album</button>

                <OpenModalSong
                buttonText={'Add Song'}
                onItemClick={closeMenu}
                modalComponent={<SongFormPost albumId={albumId}/>} />
                </div>
            )}

            <p> <a className='album-details-social-media' href={`https://www.facebook.com/search/top/?q=${album.Band.name.split(' ').join('%20')}`} >Facebook</a> </p>

            {/* <p><a className='album-details-social-media' href={`https://www.instagram.com/explore/search/keyword/?q=${album.Band.name.split(' ').join('%20')}`}>Instagram</a></p> */}

            <p><a className='album-details-social-media' href={`https://www.youtube.com/results?search_query=${album.Band.name.split(' ').join('+')}`} >YouTube</a></p>


            <h4>
            <NavLink to={`/bands/${album.bandId}`}>discography</NavLink>
            </h4>

            {Object.values(albums).filter(a=>a.bandId === album.bandId && a.id !== album.id).map((a,i) =>(
                <div className='detail-discog-card'>
                <NavLink to={`/albums/${a.id}`} style={{textDecoration: "none"}}>
                <img src={`${a.albumImage}`} alt='otheralbums' key={`albumart${i}`} className='details-discog-image'></img>

                <div className='detail-discog-link'>{a.name}</div>
                </NavLink>
                <div className='details-discog-created'>{a.createdAt.slice(0, -12)}</div>

                </div>
                )).slice(0,2)}
                <NavLink to={`/bands/${album.bandId}`}><p className='details-more-releases'>more releases...</p></NavLink>
            </div>

        </div>
        </div>
    )
}
