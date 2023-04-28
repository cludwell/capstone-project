import { Link } from "react-router-dom"
import './AboutPage.css'
export default function AboutPage() {
    return (
        <div className="about-page-container">


        <section className="the-creator">
        <div className="about-text">
        <h1 className="about-title">Christian Ludwell
        <Link to={`https://www.linkedin.com/in/christian-ludwell-047b18247/`} target='_blank'>
        <img src='https://i.imgur.com/RqO5mlh.png' alt='linkedinlogo' className='linkedin-icon'/>
        </Link>
        <Link to={'https://github.com/cludwell'} target='_blank'>
        <img src='https://i.imgur.com/KTjeA0w.png' alt='githubicon' className='github-icon'/>
        </Link>
        </h1>
        <h5>Javascript | SQL | HTML/CSS | Python | Express.js | Flask | Node.js | React.js | SQLAlchemy | Sequelize | Postgresql | Tailwind CSS</h5>
        <p>I am a student at App Academy who is transitioning into a career of programming. My previous occupation was as a roof lead for residential solar installations.
        </p>
        <p>When I am not working I am hopefully backpacking in a national forest or park or exploring a part of Mexico I've never been to. This photo here is from a trip I took to the King Range Conservation Area in Northern California, which is one of 20 black sand beaches in the world.</p>
        <p>I'm currently located in Poartland, OR. But looking to relocate, given the right opportunity!</p>
        </div>
        <img src="https://i.imgur.com/JVy6TbT.jpg" alt="selfie" className="about-me-image"/>

        </section>
        <section className="why-bandcamp">
        <img className="bandcamp-screenshot" src='https://i.imgur.com/YKuhXGy.png' alt="bandcamp-screen" />
        <div className="about-text">
        <h1 className="about-title">Why Bandcamp</h1>
        <section>I've long been a user and fan of Bandcamps' platform. They're one of the many platforms that has leveled the playing field between the major record companies and independent artists trying to connect with their fans. Their business model differs from some of the streaming sites like Spotify in that they allow artists to name and set their own prices for their records which Bandcamp takes a fraction of. When you buy music on Bandcamp you own it inpertuity, at varying fidelities, even the highest on par with vinyl. </section>

        </div>
        </section>
        </div>
    )
}
