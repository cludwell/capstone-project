import './UpcomingLiveStream.css'

export default function UpcomingLiveStream({ album, ele }) {
    return (
        <div className='livestream-container'>
            <img src={`${album.Band.artistImage}`} alt='livestream-band' className='livestream-band-img'></img>
            <div className='livestream-album'>{album.name}</div>
            <div className='livestream-band-name'>{album.Band.name}</div>
            <p></p>
            <div className='livestream-date'>{ele[0]}</div>
            <div className='livestream-time'>{ele[1]}</div>
        </div>
    )
}
