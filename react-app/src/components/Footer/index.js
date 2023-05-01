import './Footer.css'
import { Link } from 'react-router-dom'
export default function Footer() {
    return (
        <div className="footer-div">
        <h2 className="footer-title">Christian Ludwell
        <Link to={`https://www.linkedin.com/in/christian-ludwell-047b18247/`} target='_blank'>
        <img src='https://i.imgur.com/RqO5mlh.png' alt='linkedinlogo' className='linkedin-icon'/>
        </Link>
        <Link to={'https://github.com/cludwell'} target='_blank'>
        <img src='https://i.imgur.com/KTjeA0w.png' alt='githubicon' className='github-icon'/>
        </Link>
        </h2>
        </div>
    )
}
