import { useDispatch, useSelector } from 'react-redux'
import './Landing.css'
import { useEffect } from 'react'
import { fetchAlbums, fetchSingleAlbum } from '../../store/albums'
import NewAndNotable from '../NewAndNotable'

export default function Landing() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAlbums())
        dispatch(fetchSingleAlbum(1))
    }, [dispatch])

    const albums = useSelector(state => state.albums.allAlbums)
    const state = useSelector(state => state)
    console.log('===================', state)

    if (!albums || !Object.values(albums).length) return null

    return (
        <div className='landing-container'>

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
