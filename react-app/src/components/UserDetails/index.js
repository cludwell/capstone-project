import { NavLink, useHistory, useParams } from 'react-router-dom'
import './UserDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { fetchUserPurchases } from '../../store/purchases'
import { fetchUsers } from '../../store/users'
import UserDetailsAlbum from '../UserDetailsAlbum'
import { fetchAllBands } from '../../store/bands'
import { authenticate } from '../../store/session'

export default function UserDetails() {
    const { userId } = useParams()
    const dispatch = useDispatch()
    //appearing collection/wishlist albums
    const [ showBody, setShowBody ] = useState(false)
    const history = useHistory()
    const ulRef = useRef()

    const openBody = () => {
        if (showBody) return;
        setShowBody(true)
    }
    useEffect(() => {
        if (!showBody) return;
        const closeBody = e => {
            if (!ulRef.current?.contains(e.target)) setShowBody(false)
        }
        document.addEventListener('click', closeBody);
        return () => document.removeEventListener('click', closeBody)
    })
    const ulClassName = 'user-details-collection-body' + (showBody ? '' : ' hidden')
    const collectionClass = 'user-details-tab' + (!showBody ? ' user-selected' : '')
    const wishlistClass = 'user-details-tab' + (showBody ? ' user-selected' : '')
    // const closeBody = () => setShowBody(false)
    useEffect(() => {
        dispatch(fetchUserPurchases(userId))
        dispatch(fetchUsers())
        dispatch(fetchAllBands())
        dispatch(authenticate())
    }, [dispatch, userId])

    const users = useSelector(state => state.users)
    const user = users[userId]
    const loggedIn = useSelector(state => state.session.user)
    const bands = useSelector(state => state.bands.allBands)
    if (!user || !Object.values(user).length) return null

    const startBand = e => {
        history.push('/bands/new')
    }

    return (
    <div className='user-details-container'>

    <div className='user-details-header-accent'></div>
    <div className='user-details-header'>


    <img src={`${user.profilePic}`} className='user-details-profile-pic' alt='user-details-user' ></img>

    <div className='user-details-business-card'>
    <h2 className='user-details-business-title'>{user.username}</h2>
    <p className='user-details-location'>{user.city}, {user.state}</p>

    </div>
    <div className='user-deets-bands'>
        Member of
    {bands && Object.values(bands).length ? (
        Object.values(bands).filter(b=>b.userId === user.id).map((b, i) =>
        <NavLink className='user-deets-band-iter' to={`/bands/${b.id}`}>
        <div className='user-deets-band-iter' key={`iteratebands${i}`}>•{b.name}</div>
        </NavLink>
        )
    ) : null}
    </div>
    {user && loggedIn && loggedIn.id === user.id ? (
    <button className=' create-band-button' onClick={startBand}>Start Band</button>
    ) : null}
    </div>
    <div className='user-details-tabs'>
    <span className={collectionClass} onClick={openBody} >collection {user.Purchases.length}</span>
    <span className={wishlistClass}  onClick={()=> setShowBody(!showBody)}>wishlist {user.WishList.length}</span>
    </div>

    <div className={ulClassName} ref={ulRef}>

    {user.Purchases && user.Purchases.length && !showBody? user.Purchases.map(( a, i) => (
    <UserDetailsAlbum album={a} key={`userdetail${i}`}/>
    )) : null}
    {user.WishList && user.WishList.length && showBody? user.WishList.map(( album, i) => (

    <UserDetailsAlbum album={album} key={`userdetail${i}`}/>

    )) : null}
    </div>
    </div>
    )
}
