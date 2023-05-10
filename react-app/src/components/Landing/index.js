import { useDispatch, useSelector } from 'react-redux'
import './Landing.css'
import { useEffect } from 'react'
import { fetchAlbums } from '../../store/albums'
import NewAndNotable from '../NewAndNotable'
import { fetchAllPurchases } from '../../store/purchases'
import UpcomingLiveStream from '../UpcomingLiveStream'
import { fetchUsers } from '../../store/users'
import { NavLink } from 'react-router-dom'
import { fetchWishLists } from '../../store/wishlists'

export default function Landing() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAlbums())
        dispatch(fetchAllPurchases())
        dispatch(fetchUsers())
        dispatch(fetchWishLists())
    }, [dispatch])

    const albums = useSelector(state => state.albums.allAlbums)
    const user = useSelector(state => state.session.user)
    const livestreamTimes = [
        ['today', '6:00 PM PST'],
        ['today', '10:00 PM PST'],
        ['tomorrow', '2:00 PM PST'],
        ['tomorrow', '8:00 PM PST'],
        ['in two days', '7:00 PM PST'],
    ]
    // const wishes = useSelector(state => state.wishes)
    if (!albums || !Object.values(albums).length) return null

    return (
        <div className='landing-container'>
            {!user ? (<div className='updated-use-terms'>We've updated our terms of use. Please sign in.</div>
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
            {albums && albums['10'] ? (
            <NavLink to={`/bands/${albums['10'].Band.id}`} >
            <img src={`${albums['10'].Band.artistImage}`} alt='second col item' className='landing-banner-col'></img>
            </NavLink>
            ) : null }
            </div>

            </div>

            <h3 className='fans-have-paid'>✨Fans have paid artists billions using fancamp, and $190 billion in the last year✨</h3>
            <div className='landing-body'>
            <div className='centering-div'>

            <h5 className='new-notable-title'>UPCOMING FANCAMP LIVE STREAMS</h5>
            <div className='upcoming-live-streams-container'>
            {[albums['14'], albums['5'], albums['7'], albums['11'], albums['15']].map((a,i) => (
                a ? (
                <UpcomingLiveStream ele={livestreamTimes[i]} album={a} key={`livestream${i}`}/>
                ) : null
            ))}
            </div>
            </div>

            <div className='centering-div'>

            <h5 className='new-notable-title'>NEW AND NOTABLE</h5>

            <div className='new-and-notable-container'>
            {Object.values(albums).map((album,i)=> (
                <NewAndNotable album={album} key={`a${i}`}
                className={`new-notable-card${i}`}/>
            )).sort((a,b)=> b.createdAt - a.createdAt).slice(0,5)}
            </div>
            </div>
            </div>
        </div>
    )
}
