import './UserDetailsAlbum.css'

export default function UserDetailsAlbum({album}) {

    return (
        <div className='user-details-album-card'>
        <img src={`${album.Album.albumImage}`} alt='user-deets-album' className='user-deets-album'></img>
        </div>
    )
}
