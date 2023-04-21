import './NewAndNotable.css'

export default function NewAndNotable({ album }) {

    return (
    <div className='new-and-notable'>
        <img src={`${album.albumImage}`} alt='album-im' className='new-notable-image'/>
        <div className='new-and-notable-text'>
            <p></p>
        </div>
    </div>
    )
}
