import { NavLink, useParams } from 'react-router-dom'
import './BandDetails.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBandInfo } from '../../store/bands'

export default function BandDetails() {
    const { bandId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchBandInfo(bandId))
    }, [dispatch])
    const band = useSelector(state => state.bands.singleBand)

    console.log('BANDPAGE', band)
    if (!band) return null
    return (
        <div className='band-deets-page'>
        <div className='band-details-container'>
        <div className='band-deets-iterated-albums'>
        {band.Albums.map(( a, i) => (

        <div className='band-deets-album-card' key={`card${i}`}>
        <img src={`${a.albumImage}`} alt='albumart' key={`albumart${i}`} className='band-deets-albumart'></img>
        <p></p>
        <NavLink to={`/albums/${a.id}`}>{a.name}</NavLink>
        {/* <p className='band-deets-album-title'></p> */}
        </div>

        ))}
        </div>
        <div className='band-details-col'>

        <img className='album-details-band-img' alt='bandimagealbumdetails' src={`${band.artistImage}`} />
            <p>{band.city}</p>
            <p>{band.country}</p>
            <p> <a className='album-details-social-media' href={`https://www.facebook.com/search/top/?q=${band.name.split(' ').join('%20')}`} >Facebook</a> </p>

            <p><a className='album-details-social-media' href={`https://www.instagram.com/explore/search/keyword/?q=${band.name.split(' ').join('%20')}`}>Instagram</a></p>
            <p><a className='album-details-social-media' href={`https://www.youtube.com/results?search_query=${band.name.split(' ').join('+')}`} >YouTube</a></p>


                {/* <h4>discography</h4>

                {Object.values(albums).filter(a=>a.bandId === album.bandId && a.id !== album.id).map((a,i) =>(
                        <div className='detail-discog-card'>
                        <img src={`${a.albumImage}`} alt='otheralbums' key={`albumart${i}`} className='details-discog-image'></img>

                        <div className='detail-discog-link'><NavLink to={`/albums/${a.id}`}
                        style={{textDecoration: "none"}}>{a.name}</NavLink></div>
                        <div className='details-discog-created'>{a.createdAt.slice(0, -12)}</div>
                        </div>
                    )
                ).slice(0,2)} */}

        </div>
        </div>
        </div>
    )
}
