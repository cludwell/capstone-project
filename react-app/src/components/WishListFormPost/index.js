import { useDispatch, useSelector } from 'react-redux'
import './WishListFormPost.css'
import { fetchPostWish } from '../../store/wishlists'
import { useEffect } from 'react'
import { authenticate } from '../../store/session'
import { fetchUsers } from '../../store/users'

export default function WishListFormPost({ album }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authenticate())
    }, [dispatch])
    const user = useSelector(state => state.session.user)
    const handleSubmit = e => {
        e.preventDefault()
        const newWish = {user_id: user.id, album_id: album.id}
        dispatch(fetchPostWish(newWish))
        dispatch(fetchUsers())
    }

    return (
        <div className='wishlist-post-form'>
            <span className='wish-list-post' onClick={handleSubmit}>
            <i class="fa-regular fa-heart notwishlist-heart"></i>
            </span>
        </div>
    )
}
