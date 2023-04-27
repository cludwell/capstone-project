import { NavLink, useHistory, useParams } from 'react-router-dom'
import './BandDetails.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBandCommand, fetchBandInfo } from '../../store/bands'
import { authenticate } from '../../store/session'

export default function BandDetails() {
    const { bandId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchBandInfo(bandId))
        dispatch(authenticate())
    }, [dispatch, bandId])

    const band = useSelector(state => state.bands.singleBand)
    const user = useSelector(state => state.session.user)
    if (!band) return null

    const addAlbum = e => {
        history.push(`/bands/${band.id}/newAlbum`)
    }
    const deleteBand = async e => {
        dispatch(deleteBandCommand(bandId))
        history.push(`/users/${user.id}`)
    }
    const editOnClick = async e => {
        history.push(`/bands/edit/${band.id}`)
    }
    return (
        <div className='band-deets-page'>
        <div className='band-details-container'>
        <div className='band-deets-iterated-albums'>
        {band && band.Albums && band.Albums.length ? band.Albums.map(( a, i) => (

        <div className='band-deets-album-card' key={`card${i}`}>
        <NavLink to={`/albums/${a.id}`}>
        <img src={`${a.albumImage}`} alt='albumart' key={`albumart${i}`} className='band-deets-albumart'></img>
        <p className='band-deets-album-name'>
        {a.name}</p></NavLink>
        {/* <p className='band-deets-album-title'></p> */}
        </div>

        )) : (
            <>
            <h1>Share your music with the world! Post an album!</h1>
            </>
        )}
        </div>
        <div className='band-details-col'>

        <img className='album-details-band-img' alt='bandimagealbumdetails' src={`${band.artistImage}`} />
        <div className='band-deets-bandname'>{band.name}</div>
        <div className='album-deets-country'>{band.country}</div>
        <p className='album-deets-city'>{band.city}</p>
        {user && band.userId === user.id ? (
            <>
            <button className='band-deets-user-auth' onClick={editOnClick}>Edit Band</button>
            <button className='band-deets-user-auth' onClick={addAlbum}>Add Album</button>
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
