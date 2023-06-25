import { useSelector } from 'react-redux'
import './Footer.css'
import { Link } from 'react-router-dom'
export default function Footer() {
    const album = useSelector(state => state.albums.singleAlbum)
    const band = useSelector(state => state.bands.singleBand)
    const rgbaParser = str => `rgba(${parseInt(str.slice(1, 3), 16)}, ${parseInt(str.slice(3, 5), 16)}, ${parseInt(str.slice(5), 16)}, 0.8)`

    return (
        <div className="footer-div">
        <h2 className="footer-title"
        style={{
            backgroundColor: album?.Band?.backgroundColorSecondary ? rgbaParser(album.Band.backgroundColorSecondary)
            : band && band.backgroundColorSecondary ? rgbaParser(band.backgroundColorSecondary)
            : null,
            color: album && album.Band && album.Band.textColor ? album.Band.textColor
            : band && band.textColor ? band.textColor
            : null
        }}
        >Christian Ludwell
        <Link to={{ pathname: `https://www.linkedin.com/in/christian-ludwell-047b18247/`}} target='_blank'>
        <img
        src='https://i.imgur.com/RqO5mlh.png'
        alt='linkedinlogo'
        className='linkedin-icon'
        style={{
            filter: album && album.Band && album.Band.backgroundColorSecondary.toLowerCase() === '#ffffff' ? 'invert(1)' : null
        }}/>
        </Link>
        <Link to={{ pathname: 'https://github.com/cludwell'}} target='_blank'>
        <img
        src='https://i.imgur.com/KTjeA0w.png'
        alt='githubicon'
        className='github-icon'
        style={{
            filter: album && album.Band && album.Band.backgroundColorSecondary === '#000000' ? 'invert(1)'
            : band && band.backgroundColorSecondary === '#000000'? 'invert(1)'
            : null
        }}/>
        </Link>
        </h2>
        </div>
    )
}
