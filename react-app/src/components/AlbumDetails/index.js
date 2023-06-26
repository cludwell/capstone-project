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
import SongDeleteModal from '../SongDeleteModal'
import { deleteCartRequest, fetchUserCart, postCartRequest } from '../../store/carts'
import CheckOutModal from '../CheckOutModal'
import OpenModalCheckOutPreview from '../OpenModalButton/OpenModalCheckoutPreview'
import ReactPlayer from 'react-player';
import Footer from '../Footer'

export default function AlbumDetails() {
    const dispatch = useDispatch()
    const { albumId } = useParams()
    const history = useHistory()
    // const [ duration, setDuration ] = useState(0)
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
        const loadData = async () => {
            await dispatch(fetchSingleAlbum(albumId))
            await dispatch(fetchUserPurchases())
            await dispatch(fetchAlbums())
            await dispatch(fetchUsers())
            await dispatch(fetchWishLists())
            await dispatch(fetchUserCart())
        }
        loadData()
    }, [dispatch, albumId])

    const album = useSelector(state => state.albums.singleAlbum)
    const albums = useSelector(state => state.albums.allAlbums)
    const users = useSelector(state => state.users)
    const user = useSelector(state => state.session.user)
    const wishes = useSelector(state => state.wishes.userWishes)
    const cart = useSelector(state => state.cart.userCart)
    const purchases = useSelector(state => state.purchases.user)
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
    const buyAlbum = async e => {
        if (!user) return alert('Please sign in to add items to cart!')
        if (cart.some(c=>c.albumId === album.id)) return alert('Item is already in cart.')
        await dispatch(postCartRequest({album_id: parseInt(album.id), user_id: parseInt(user.id)}))
    }
    const deleteCart = async cartId => {
        await dispatch(deleteCartRequest(cartId))
        await dispatch(fetchUserCart())
    }
    const songUrl = album && album.Songs && album.Songs.length ? album.Songs.find(s=> s.url) : null

    const rgbaParser = str => `rgba(${parseInt(str.slice(1, 3), 16)}, ${parseInt(str.slice(3, 5), 16)}, ${parseInt(str.slice(5), 16)}, 0.8)`

    return (
        <div className='album-details-page'
        style={
            album.Band.backgroundImage && album.Band.tiled ? {
              backgroundImage: `url(${album.Band.backgroundImage})`
        } : album.Band.backgroundImage && !album.Band.tiled ? {
            backgroundImage: `url(${album.Band.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
        }
          : album.Band.backgroundColor ? {
            backgroundColor: album.Band.backgroundColor
        } : null }>

            {album.Band && album.Band.bannerUrl ? (
                <img src={`${album.Band.bannerUrl}`} alt='bandbannerimage' className='album-details-banner'/>
            ) : null}

            {album.youtube ? (
                <ReactPlayer
                url={album.youtube}
                style={{alignSelf: "center"}}
                width={'95vmin'}
                height={'50vmin'}
                />
            ) : null}

        <div className='album-details-container'
        style={{
            backgroundColor: album.Band.backgroundColorSecondary ? rgbaParser(album.Band.backgroundColorSecondary) : null,
            color: album.Band.textColor ? album.Band.textColor : null
        }}>

            <div className='tracks-column'>
            <h2 className='album-details-title'>{album.name}</h2>
            <p className='details-band-name'>by {album.Band.name}</p>
            <div className='details-react-player'>
                {songUrl ? (
                    <>
                    <div>{songUrl.trackNum}: {songUrl.name}</div>
                    <ReactPlayer url={songUrl.url}
                    controls={true}
                    className='player'
                    playsinline={true}
                    config={{
                        file: {
                          attributes: {
                            controlsList: 'nodownload'
                          }
                        }
                      }}
                    width={'37vmin'}
                    height={'6vmin'}
                    />
                </>
                ) : null}
            </div>
            <div className='album-details-streaming-info'>

            {user && purchases && purchases.length && purchases.some(p => p.albumId === album.id) ? (
            <p>
            <i className="fa-solid fa-heart purchased-list"/>
            You Own This
            </p>
                ) : (
            <h3 className='details-info buy-digital-album' onClick={buyAlbum}>Buy Digital Album ${album.price}</h3>
            )}
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
                {user && album.Band.userId === user.id
                 ? (
                    <>
                    <td key={`edit${i}`} className='user-auth-song'>
                    <OpenModalButton
                    key={`modaleditsong${i}`}
                    buttonText={<i className="fa-solid fa-pen-to-square"></i>}
                    onItemClick={closeMenu}
                    modalComponent={<SongFormPut albumId={album.id} song= {s} />} />
                    </td>
                    <td key={`del${i}`} className='user-auth-song'>
                    <OpenModalButton
                    key={`modaldeletesong${i}`}
                    buttonText={<i className="fa-solid fa-trash-can"></i>}
                    onItemClick={closeMenu}
                    modalComponent={<SongDeleteModal album={album} song={s} />} />
                    </td>
                    </>
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
            ) : user && purchases && purchases.length && purchases.some(p => p.albumId === album.id ) ? (
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



            {user && cart && cart.length ? (
            <div className='cart-preview'>
                <div className='cart-title'>Shopping Cart</div>
                {user && cart && cart.length ? cart.map((c, i)=> (
                    <div className='cart-instance' key={`cart${i}`}>
                    <div className='cart-album-name'>{c.Album.name}</div>
                    <span className='cart-album-price'>${c.Album.price} USD</span>
                    <span className='cart-delete-instance' onClick={() => deleteCart(c.id)}>
                        <i className="fa-solid fa-trash-can"></i></span>
                    </div>
                )) : null}
                <hr></hr>
            <div className='cart-preview-total-row'>
            <span className='cart-preview-total'>Total</span>
            <span className='cart-preview-sum'>${cart.reduce((acc, ele) => acc + ele.Album.price, 0).toFixed(2)}</span>
            </div>
            <div className='cart-preview-buttons'>
            <OpenModalCheckOutPreview
            buttonText={'Check Out'}
            onItemClick={closeMenu}
            modalComponent={<CheckOutModal user={user} cart={cart} />} />
            </div>
            </div>
            ) : null}
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
            <NavLink to={`/bands/${album?.bandId}`}>discography</NavLink>
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
        <Footer />
        </div>
    )
}
