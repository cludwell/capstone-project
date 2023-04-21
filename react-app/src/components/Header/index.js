import './Header.css'
import Navigation from '../Navigation'
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
            <div className='logo-text'>fanca🤘p</div>

            <div className='navi-corner'>

            <div className='user-activity-feed'>
            <i className="fa-regular fa-bolt-lightning"></i>
            </div>

            <div className='user-collection'>
            <i class="fa-sharp fa-regular fa-heart"></i>
             </div>
            
            <Navigation isLoaded={isLoaded} />
                        </div>

        </div>
    )
}
