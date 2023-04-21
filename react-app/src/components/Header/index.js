import './Header.css'
import Navigation from '../Navigation'
import { NavLink } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { useEffect } from 'react'
// import { authenticate } from '../../store/session'

export default function Header({ isLoaded }) {
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(authenticate())
    // }, [dispatch])

    return (
        <div className='header-container'>
            <div className='logo-text'>
            <NavLink to={'/'}
            style={{textDecoration: "none",
            color: "black"}}>fanca🤘p</NavLink>
            </div>

            <div className='navi-corner'>

            <div className='user-activity-feed navi-items'>
            <i className="fa-solid fa-bolt-lightning navi-icons"></i>
            </div>

            <div className='user-collection navi-items'>
            <i className="fa-regular fa-heart navi-icons"/>
            </div>

            <div className='navi-items navi-items'>
            <Navigation isLoaded={isLoaded} />
            </div>

            </div>

        </div>
    )
}
