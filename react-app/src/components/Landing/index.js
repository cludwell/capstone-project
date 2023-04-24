import { useDispatch, useSelector } from 'react-redux'
import './Landing.css'
import { useEffect } from 'react'
import { fetchAlbums } from '../../store/albums'
import NewAndNotable from '../NewAndNotable'
import { fetchAllPurchases } from '../../store/purchases'
import UpcomingLiveStream from '../UpcomingLiveStream'
import { fetchUsers } from '../../store/users'
import { NavLink } from 'react-router-dom'

export default function Landing() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAlbums())
        dispatch(fetchAllPurchases())
        dispatch(fetchUsers())
    }, [dispatch])

    const albums = useSelector(state => state.albums.allAlbums)
    const state = useSelector(state => state)
    console.log('STATE', state)
    const livestreamTimes = [
        // ['time,', 'time'],
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

            {/* <h5 className='landing-banner-mid-sub'>DnD inspired fantasy metal</h5> */}


            <div className='landing-banner'>

            <div className='landing-banner-main'>

            <h1 className='landing-banner-title'>Introducing Juanita y los Feos</h1>
            <h2 className='landing-banner-subtitle'>New Wave Punk Rockers from Madrid</h2>
            <NavLink to={`/bands/${albums['8'].bandId}`}>
            <img className='landing-banner-main-photo' src={`${albums['8'].Band.artistImage}`} alt='main-banner-land'></img>
            </NavLink>
            </div>

            <div className='landing-banner-column'>
            <h4 className='landing-banner-mid-col'>Fellowship carries DragonForce's torch</h4>
            <h4 className='landing-banner-bottom-col'>Vancouver's Champions of Metal</h4>
            <h4 className='landing-banner-bottom-col-b'>UNLEASH THE ARCHERS</h4>
            <h4 className='landing-banner-top'>Juanita y los Feos' Last Album</h4>
            <NavLink to={`/albums/${albums['9'].id}`}>
            <img src={`${albums['9'].albumImage}`} alt='first column' className='landing-banner-col'></img>
            </NavLink>
            <NavLink to={`/albums/${albums['6'].id}`}>
            <img src={`${albums['6'].albumImage}`} alt='second col item' className='landing-banner-col'></img>
            </NavLink>
            <NavLink to={`/bands/${albums['10'].Band.id}`} >
            <img src={`${albums['10'].Band.artistImage}`} alt='second col item' className='landing-banner-col'></img>
            </NavLink>
            </div>

            </div>

            <h3 className='fans-have-paid'>✨Fans have paid artists billions using fancamp, and $190 billion in the last year✨</h3>

            <div className='centering-div'>

            <h5 className='new-notable-title'>UPCOMING FANCAMP LIVE STREAMS</h5>
            <div className='upcoming-live-streams-container'>
            {Object.values(albums).map((a,i) => (
                <UpcomingLiveStream ele={livestreamTimes[i]} album={a} key={`livestream${i}`}/>
            )).reverse().slice(2, 6)}
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
