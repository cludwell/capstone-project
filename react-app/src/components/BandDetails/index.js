import { NavLink, useHistory, useParams } from 'react-router-dom'
import './BandDetails.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBandCommand, fetchAllBands, fetchBandInfo } from '../../store/bands'
import { authenticate } from '../../store/session'
import Footer from '../Footer'

export default function BandDetails() {
    const { bandId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const loadData = async () => {
            await dispatch(fetchBandInfo(bandId))
            await dispatch(authenticate())
        }
        loadData()
    }, [dispatch, bandId])

    const band = useSelector(state => state.bands.singleBand)
    const user = useSelector(state => state.session.user)
    if (!band) return null

    const addAlbum = e => {
        history.push(`/bands/${band.id}/newAlbum`)
    }
    const deleteBand = async e => {
        await dispatch(deleteBandCommand(bandId))
        await dispatch(fetchAllBands())
        history.push(`/users/${user.id}`)
    }
    const editOnClick = async e => {
        history.push(`/bands/edit/${band.id}`)
    }
    const rgbaParser = str => `rgba(${parseInt(str.slice(1, 3), 16)}, ${parseInt(str.slice(3, 5), 16)}, ${parseInt(str.slice(5), 16)}, 0.8)`
    
    return (
        <div className='band-deets-page'
        style={
            band.backgroundImage && band.tiled ? {
              backgroundImage: `url(${band.backgroundImage})`
        } : band.backgroundImage && !band.tiled ? {
            backgroundImage: `url(${band.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
        }
          : band.backgroundColor ? {
            backgroundColor: band.backgroundColor
        } : null }>
        <div className='band-details-container'
                style={{
                    backgroundColor: band.backgroundColorSecondary ? rgbaParser(band.backgroundColorSecondary) : null,
                    color: band.textColor ? band.textColor : null
                }}>
        <div className='band-deets-iterated-albums'>
        {band && band.Albums && band.Albums.length ? band.Albums.map(( a, i) => (

        <div className='band-deets-album-card' key={`card${i}`}>
        <NavLink to={`/albums/${a.id}`}>
        <img src={`${a.albumImage}`} alt='albumart' key={`albumart${i}`} className='band-deets-albumart'></img>
        <p className='band-deets-album-name'>
        {a.name}</p></NavLink>
        </div>

        )) : (
            <h2>Nothing here yet</h2>
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

        <p><a className='album-details-social-media' href={`https://www.youtube.com/results?search_query=${band.name.split(' ').join('+')} band`} >YouTube</a></p>


        </div>
        </div>
        <Footer/>
        </div>
    )
}
