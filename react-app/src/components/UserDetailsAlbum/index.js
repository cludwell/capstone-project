import './UserDetailsAlbum.css'

export default function UserDetailsAlbum({album}) {

    return (
        <div className='user-details-album-card'>
        <img src={`${album.Album.albumImage}`} alt='user-deets-album' className='user-deets-album'></img>
        <div className='user-details-album-text'>
        <div className='user-details-album-name'>{album.Album.name}</div>
        <div className='user-details-album-band'> by {album.Band.name}</div>
        </div>

        <div className='user-details-album-appears'>appears in {} other collections</div>
        </div>
    )
}
