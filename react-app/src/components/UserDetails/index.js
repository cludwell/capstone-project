import { useParams } from 'react-router-dom'
import './UserDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUserPurchases } from '../../store/purchases'
import { fetchUsers } from '../../store/users'
import UserDetailsAlbum from '../UserDetailsAlbum'

export default function UserDetails() {
    const { userId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserPurchases(userId))
        dispatch(fetchUsers())
    })
    const users = useSelector(state => state.users)
    const user = users[userId]
    return (
    <div className='user-details-container'>

    <div className='user-details-header'>

    <div className='user-details-header-accent'></div>

    <img src={`${user.profilePic}`} className='user-details-profile=pic' alt='user-details-user' ></img>

    <div className='user-details-business-card'>
        <h2 className='user-details-business-title'>{user.username}</h2>
        <p className='user-details-location'>{user.city}, {user.state}</p>
    </div>

    </div>
    <div className='user-details-tabs'>
    <span className='user-details-collection'>collection {user.Purchases.length}</span>
    <span className='user-details-wishlist'>wishlist {user.WishList.length}</span>
    </div>

    <div className='user-details-collection-body'>

    {user.Purchases && user.Purchases.length ? user.Purchases.map(( a, i) => (
    <UserDetailsAlbum album={a} />
    )) : null}
    </div>
    </div>
    )
}
