import { NavLink, useHistory, useParams } from 'react-router-dom'
import './BandDetails.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBandInfo } from '../../store/bands'
import { authenticate } from '../../store/session'

export default function BandDetails() {
    const { bandId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        dispatch(fetchBandInfo(bandId))
        dispatch(authenticate())
    }, [dispatch])
    const band = useSelector(state => state.bands.singleBand)
    const user = useSelector(state => state.session.user)
    // console.log('BANDPAGE', band)
    if (!band) return null
    const deleteBand = () => {
        history.push(`/users/${user.id}`)
    }
    return (
        <div className='band-deets-page'>
        <div className='band-details-container'>
        <div className='band-deets-iterated-albums'>
        {band && band.Albums.length ? band.Albums.map(( a, i) => (

        <div className='band-deets-album-card' key={`card${i}`}>
        <img src={`${a.albumImage}`} alt='albumart' key={`albumart${i}`} className='band-deets-albumart'></img>
        <NavLink to={`/albums/${a.id}`}><p className='band-deets-album-name'>
        {a.name}</p></NavLink>
        {/* <p className='band-deets-album-title'></p> */}
        </div>

        )) : null}
        </div>
        <div className='band-details-col'>

        <img className='album-details-band-img' alt='bandimagealbumdetails' src={`${band.artistImage}`} />
        <p className='album-deets-country'>{band.country}</p>
        <p className='album-deets-city'>{band.city}</p>
        {user && band.userId === user.id ? (
            <>
            <button className='band-deets-user-auth'>Edit Band</button>
            <button className='band-deets-user-auth'>Add Album</button>
            <button className='band-deets-user-auth' onClick={deleteBand}>Break Up Band</button>
            </>
        ) : null}
        <p className='band-deets-desc'>{band.description}</p>
        <p> <a className='album-details-social-media' href={`https://www.facebook.com/search/top/?q=${band.name.split(' ').join('%20')}`} >Facebook</a> </p>

        <p><a className='album-details-social-media' href={`https://www.instagram.com/explore/tags/${band.name.split(' ').join('')}`}>Instagram</a></p>

        <p><a className='album-details-social-media' href={`https://www.youtube.com/results?search_query=${band.name.split(' ').join('+')}`} >YouTube</a></p>


        </div>
        </div>
        </div>
    )
}
