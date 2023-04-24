import { useDispatch, useSelector } from 'react-redux'
import './UserDetailsAlbum.css'
import { useEffect } from 'react'
import { fetchAlbums } from '../../store/albums'
import { NavLink } from 'react-router-dom'

export default function UserDetailsAlbum({album}) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAlbums())
    }, [dispatch])
    const albums = useSelector(state => state.albums.allAlbums)
    if (!albums) return null
    return (
        <NavLink to={`/albums/${album.id}`}
        style={{textDecoration: "none"}}>
        <div className='user-details-album-card'>
        <img src={`${album.Album.albumImage}`} alt='user-deets-album' className='user-deets-album'></img>
        <div className='user-details-album-text'>
        <div className='user-details-album-name'>{album.Album.name}</div>
        <div className='user-details-album-band'> by {album.Band.name}</div>
        </div>

        <div className='user-details-album-appears'>appears in
        <span className='user-deets-blue-text' > {albums[album.id].Sales.length} other collections</span></div>

        </div>
        </NavLink>
    )
}
