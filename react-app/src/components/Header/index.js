import './Header.css'
import Navigation from '../Navigation'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { authenticate } from '../../store/session'
import { fetchUserCart } from '../../store/carts'
import OpenModalCheckout from '../OpenModalButton/OpenModalCheckOut'
import CheckOutModal from '../CheckOutModal'

export default function Header({ isLoaded }) {
    const dispatch = useDispatch()
    const [ showMenu, setShowMenu ] = useState(false)
    const ulRef = useRef()
    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = e => {
            if (!ulRef.current?.contains(e.target)) setShowMenu(false)
        }
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])
    const closeMenu = e => setShowMenu(false)
    
    useEffect(() => {
        dispatch(authenticate())
        dispatch(fetchUserCart())
    }, [dispatch])
    const user = useSelector(state => state.session.user)
    let cart = useSelector(state => state.cart.userCart)
    cart = user ? cart : []
    return (
        <div className='header-container'>
            <div className='logo-text'>
            <NavLink to={'/'}
            style={{textDecoration: "none",
            color: "black"}}>fanca🤘p</NavLink>
            </div>

            <div className='navi-corner'>
            {cart && cart.length ? (
            <div className='navi-items navi-items cart-div'>
            <div className='number-in-cart'>{cart.length}</div>
            <OpenModalCheckout
            buttonText={<i className="fa-solid fa-cart-shopping navi-icons"></i>}
            onItemClick={closeMenu}
            modalComponent={<CheckOutModal user={user} cart={cart} />} />
            </div>
            ) : null}

            <div className='user-activity-feed navi-items'>
            <NavLink to={`/about`} >
            <i className="fa-solid fa-bolt-lightning navi-icons"></i>
            </NavLink>
            </div>
            <div className='user-collection navi-items'>


            {user && user.id ? (
            <NavLink to={`/users/${user.id}`}
            style={{textDecoration: "none"}}>
            <i className="fa-regular fa-heart navi-icons"/>
            </NavLink>
            ) : (
            <i className="fa-regular fa-heart navi-icons"/>
            )}
            </div>

            <div className='navi-items navi-items'>
            <Navigation isLoaded={isLoaded} />
            </div>

            </div>

        </div>
    )
}
