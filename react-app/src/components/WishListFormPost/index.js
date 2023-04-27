import { useDispatch, useSelector } from 'react-redux'
import './WishListFormPost.css'
import { fetchPostWish, fetchWishLists } from '../../store/wishlists'
import { useEffect } from 'react'
import { authenticate } from '../../store/session'
import { fetchUsers } from '../../store/users'

export default function WishListFormPost({ album }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authenticate())
    }, [dispatch])
    const user = useSelector(state => state.session.user)
    const handleSubmit = async e => {
        e.preventDefault()
        const newWish = {user_id: user.id, album_id: album.id}
        await dispatch(fetchPostWish(newWish))
        await dispatch(fetchUsers())
        await dispatch(fetchWishLists())
    }

    return (
        <div className='wishlist-post-form'>
            <span className='wish-list-post' onClick={handleSubmit}>
            <i className="fa-regular fa-heart notwishlist-heart"></i>
            </span>
        </div>
    )
}
