import { useDispatch, useSelector } from 'react-redux'
import './Landing.css'
import { useEffect } from 'react'
import { fetchAlbums } from '../../store/albums'
import NewAndNotable from '../NewAndNotable'
import { fetchAllPurchases } from '../../store/purchases'
import UpcomingLiveStream from '../UpcomingLiveStream'

export default function Landing() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAlbums())
        dispatch(fetchAllPurchases())
    }, [dispatch])

    const albums = useSelector(state => state.albums.allAlbums)
    const state = useSelector(state => state)
    console.log('STATE', state)
    const livestreamTimes = [
        ['in two days', '7:00 PM PST'],
        ['tomorrow', '8:00 PM PST'],
        ['tomorrow', '2:00 PM PST'],
        ['today', '10:00 PM PST'],
        ['today', '6:00 PM PST']
    ]
    if (!albums || !Object.values(albums).length) return null

    return (
        <div className='landing-container'>
            {!state.session.user ? (<div className='updated-use-terms'>We've updated our terms of use. Please sign in.</div>
            ) : null}

            <h4 className='landing-banner-mid-col'>Fellowship carries DragonForce's torch</h4>
            {/* <h5 className='landing-banner-mid-sub'>DnD inspired fantasy metal</h5> */}


            <div className='landing-banner'>
            <div className='landing-banner-main'>
            <h1 className='landing-banner-title'>Introducing Juanita y los Feos</h1>
            <h2 className='landing-banner-subtitle'>New Wave Punk Rockers from Madrid</h2>

            <img className='landing-banner-main-photo' src={`${albums['8'].Band.artistImage}`} alt='main-banner-land'></img>
            </div>

            <div className='landing-banner-column'>
            <img src={`${albums['9'].albumImage}`} alt='first column' className='landing-banner-col'></img>
            <img src={`${albums['6'].albumImage}`} alt='second col item' className='landing-banner-col'></img>
            <img src={`${albums['10'].Band.artistImage}`} alt='second col item' className='landing-banner-col'></img>
            </div>

            </div>

            <h3 className='fans-have-paid'>✨Fans have paid artists billions using fancamp, and $190 billion in the last year✨</h3>

            <div className='centering-div'>

            <h5 className='new-notable-title'>UPCOMING FANCAMP LIVE STREAMS</h5>
            <div className='upcoming-live-streams-container'>
            {Object.values(albums).map((a,i) => (
                <UpcomingLiveStream ele={livestreamTimes[i]} album={a} />
            )).reverse().slice(6, 11)}
            </div>
            </div>

            <div className='centering-div'>
            <h5 className='new-notable-title'>NEW AND NOTABLE</h5>
            <div className='new-and-notable-container'>
            {Object.values(albums).map((album,i)=> (
                <NewAndNotable album={album} key={`a${i}`}
                className={`new-notable-card${i}`}/>
                // <p>{album.id}</p>
            )).reverse().slice(0,5)}
            </div>
            </div>
        </div>
    )
}
