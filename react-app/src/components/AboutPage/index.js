import { Link } from "react-router-dom";
import "./AboutPage.css";
import Footer from "../Footer";
import { clearAlbumState } from "../../store/albums";
import { clearBandState } from "../../store/bands";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import PortfolioIcon from "../PortfolioIcon";
export default function AboutPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    const loadData = async () => {
      await dispatch(clearAlbumState());
      await dispatch(clearBandState());
    };
    loadData();
  }, [dispatch]);
  return (
    <div className="about-page-container">
      <h1>About the creator</h1>
      <section className="the-creator">
        <div className="about-text">
          <h1 className="about-title">Christian Ludwell</h1>
          <img
            src="https://skillicons.dev/icons?i=js,html,css,docker,express,flask,git,nodejs,nextjs,postgres,postman,prisma,py,react,redux,sequelize,tailwind,ts,vscode&perline=8&theme=light"
            alt=""
            className="skill-icons"
          />
          <p>
            Hi! I'm Chris! I'm a Full Stack Software Engineer with a Bachelors
            in Geography and International Development.
          </p>
          <p>
            Before becoming a software engineer I was a Senior Installer doing
            residential solar installations. My role meant quality and safe
            installations, for clients and my team, all within the span of one
            day. It was from this work that I learned I enjoyed creative problem
            solving and wanted a career in which I was always learning and
            constantly being challenged, as well as the sense of completion that
            comes from seeing a project in all aspects from start to finish.{" "}
          </p>
          <p>
            When I am not working I am hopefully backpacking in a national
            forest or exploring a part of Mexico I've never been to.{" "}
          </p>
          <p>
            I'm currently located in Portland, OR. But looking to relocate,
            given the right opportunity! I'm passionate about software that
            levels playing fields and changes the way we live our lives. Please
            feel free to contact me to discuss work opportunities or possible
            collaborations.
          </p>
          <h1 className="icons">
            <Link
              to={{
                pathname: `https://www.linkedin.com/in/christian-ludwell-047b18247/`,
              }}
              target="_blank"
            >
              <img
                src="https://i.imgur.com/RqO5mlh.png"
                alt="linkedinlogo"
                className="linkedin-icon"
              />
            </Link>
            <Link
              to={{ pathname: "https://github.com/cludwell" }}
              target="_blank"
            >
              <img
                src="https://i.imgur.com/KTjeA0w.png"
                alt="githubicon"
                className="github-icon"
              />
            </Link>
            <span className="portfolio-icon">
              <Link
                to={{ pathname: "https://cludwell.github.io/#" }}
                target="_blank"
              >
                <PortfolioIcon />
              </Link>
            </span>
          </h1>
        </div>
        <img
          src="https://i.imgur.com/JVy6TbT.jpg"
          alt="selfie"
          className="about-me-image"
        />
      </section>
      <section className="why-bandcamp">
        <img
          className="bandcamp-screenshot"
          src="https://i.imgur.com/YKuhXGy.png"
          alt="bandcamp-screen"
        />
        <div className="about-text">
          <h1 className="about-title">Why Bandcamp</h1>
          <p>
            I've long been a user and fan of Bandcamps' platform. They're one of
            the many platforms that has leveled the playing field between the
            major record companies and independent artists trying to connect
            with their fans. Their business model differs from some of the
            streaming sites like Spotify in that they allow artists to name and
            set their own prices for their records which Bandcamp takes a
            fraction of. When you buy music on Bandcamp you own it inpertuity,
            at varying fidelities, even the highest flac files on par with
            vinyl. Imagine taking your vinyl records with you anywhere and never
            having to worry about them getting scratched or damaged in the heat.
          </p>
          <p>
            In short, it's business model for enthusiasts that allows for more
            freedom for both artists and fans.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
