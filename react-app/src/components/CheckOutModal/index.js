import { useDispatch } from 'react-redux'
import './CheckOutModal.css'
import { checkOutRequest, deleteCartRequest, fetchUserCart } from '../../store/carts'
import { useModal } from '../../context/Modal'

export default function CheckOutModal({ user, cart }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const deleteCart = async cartId => {
        await dispatch(deleteCartRequest(cartId))
        await dispatch(fetchUserCart())

    }
    const checkOut = async e => {
        await dispatch(checkOutRequest())
        await dispatch(fetchUserCart())
        closeModal()
    }
    return (
        <div className='checkout-modal-container'>
        <h2 className='cart-title-modal'>Shopping Cart</h2>
        {user && cart && cart.length ? cart.map((c, i)=> (
        <div className='cart-instance-modal' key={`cart${i}`}>
        <div className='cart-album-name-modal'>{c.Album.name}</div>
        <span className='cart-album-price-modal'>${c.Album.price} USD</span>
        <span className='cart-delete-instance-modal' onClick={() => deleteCart(c.id)}>
        <i className="fa-solid fa-trash-can"></i></span>
        </div>
        )) : null}
        <hr></hr>
        <div>
        <span className='cart-preview-total-modal'>Total</span>
        <span className='cart-preview-sum-modal'>${cart.reduce((acc, ele) => acc + ele.Album.price, 0).toFixed(2)}</span>
        </div>
        <div className='checkout-modal-bottom'>
        <img src='https://i.imgur.com/QfGSupn.png' alt='payment-methods' className='payment-methods'/>
        <button className='band-deets-user-auth checkout-modal-submit' id='checkout-modal-submit' onClick={checkOut}>Pay Now</button>
        </div>
        </div>
    )
}
