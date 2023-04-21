import { NavLink } from 'react-router-dom'
import './NewAndNotable.css'

export default function NewAndNotable({ album }) {

    return (
    <NavLink to={`/albums/${album.id}`}
    style={{textDecoration: "none"}}>
    <div className='new-and-notable'>
        <img src={`${album.albumImage}`} alt='album-im' className='new-notable-image'/>
        <div className='new-notable-text'>
            <section className='new-notable-album'>{album.name.toUpperCase()}</section>
            <section className='new-notable-genre'>{album.genre}</section>
            <section className='new-notable-desc'>{album.description.slice(0,250)}</section>
        </div>
    </div>
    </NavLink>
    )
}
