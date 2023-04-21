import './Header.css'
import ProfileButton from '../Navigation/ProfileButton'
import Navigation from '../Navigation'

export default function Header({ isLoaded }) {
    return (
        <div className='header-container'>
            <div className='logo-text'>fanca🤘p</div>

            <div className='user-activity-feed'>
            <i className="fa-regular fa-bolt-lightning"></i>
            </div>

            <div className='user-collection'>
            <i class="fa-sharp fa-regular fa-heart"></i>
             </div>

            <Navigation isLoaded={isLoaded} />
        </div>
    )
}
