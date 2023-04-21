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
        ['tomorrow', '2:00 PM PST'],
        ['tomorrow', '8:00 PM PST'],
        ['today', '10:00 PM PST'],
        ['today', '6:00 PM PST'],
    ]
    if (!albums || !Object.values(albums).length) return null

    return (
        <div className='landing-container'>

            <h3 className='fans-have-paid'>Fans have paid artists billions using fancamp, and $190 billion in the last year</h3>

            <h5 className='new-notable-title'>UPCOMING FANCAMP LIVE STREAMS</h5>
            <div className='upcoming-live-streams-container'>
            {Object.values(albums).map((a,i) => (
                <UpcomingLiveStream ele={livestreamTimes[i]} album={a} />
            )).reverse().slice(5, 10)}
            </div>
            <h5 className='new-notable-title'>NEW AND NOTABLE</h5>
            <div className='new-and-notable-container'>
            {Object.values(albums).map((album,i)=> (
                <NewAndNotable album={album} key={`a${i}`}
                className={`new-notable-card${i}`}/>
                // <p>{album.id}</p>
            )).reverse().slice(0,5)}
            </div>
        </div>
    )
}
