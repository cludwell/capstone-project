import './UpcomingLiveStream.css'

export default function UpcomingLiveStream({ album, ele }) {
    return (
        <div className='livestream-container'>
            <div>
            <img src={`${album.Band.artistImage}`} alt='livestream-band' className='livestream-band-img'></img>
            <div className='livestream-album'>{album.name.toUpperCase()}</div>
            <div className='livestream-band-name'>{album.Band.name}</div>
            </div>
            <div>
            <div className='livestream-date'><i className="fa-regular fa-calendar"></i> {ele[0]}</div>
            <div className='livestream-time'><i className="fa-regular fa-clock"></i> {ele[1]}</div>
            </div>
        </div>
    )
}
