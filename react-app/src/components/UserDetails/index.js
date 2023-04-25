import { useParams } from 'react-router-dom'
import './UserDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { fetchUserPurchases } from '../../store/purchases'
import { fetchUsers } from '../../store/users'
import UserDetailsAlbum from '../UserDetailsAlbum'

export default function UserDetails() {
    const { userId } = useParams()
    const dispatch = useDispatch()
    //appearing collection/wishlist albums
    const [ showBody, setShowBody ] = useState(false)
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
    // const closeBody = () => setShowBody(false)
    useEffect(() => {
        dispatch(fetchUserPurchases(userId))
        dispatch(fetchUsers())
    }, [dispatch, userId])
    const users = useSelector(state => state.users)
    const user = users[userId]
    if (!user || !Object.values(user).length) return null

    return (
    <div className='user-details-container'>

    <div className='user-details-header-accent'></div>
    <div className='user-details-header'>


    <img src={`${user.profilePic}`} className='user-details-profile-pic' alt='user-details-user' ></img>

    <div className='user-details-business-card'>
    <h2 className='user-details-business-title'>{user.username}</h2>
    <p className='user-details-location'>{user.city}, {user.state}</p>
    </div>
    <button className='band-deets-user-auth create-band-button'>Start Band</button>
    </div>
    <div className='user-details-tabs'>
    <span className='user-details-collection' onClick={openBody} >collection {user.Purchases.length}</span>
    <span className='user-details-wishlist'  onClick={()=> setShowBody(!showBody)}>wishlist {user.WishList.length}</span>
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
