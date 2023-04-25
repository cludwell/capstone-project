import { useDispatch } from 'react-redux'
import './WishListFormPost'

export default function WishListFormPost() {
    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()
        dispatch()
    }
    return (
        <div className='wishlist-post-form'>

        </div>
    )
}
