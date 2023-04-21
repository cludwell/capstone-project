import { useDispatch, useSelector } from 'react-redux'
import './Landing.css'
import { useEffect } from 'react'
import { fetchAlbums } from '../../store/albums'

export default function Landing() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAlbums())
    }, [dispatch])

    const albums = useSelector(state => state.albums)
    console.log('===================', albums)
    return (
        <div className='landing-container'>

        </div>
    )
}
