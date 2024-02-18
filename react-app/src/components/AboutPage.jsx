import { Link } from "react-router-dom";
import { clearAlbumState } from "../store/albums";
import { clearBandState } from "../store/bands";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import PortfolioIcon from "./Icons/IconPortfolio";
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
    <>
      <div className="items-center max-w-screen-lg mx-3 lg:mx-auto my-8 ">
        <h1 className="text-2xl sm:text-3xl text-center font-serif fade-in">
          About the Developer
        </h1>
        <section className="flex flex-row mt-8 fade-in">
          <div className="about-text">
            <h1 className="text-2xl font-serif">Christian Ludwell</h1>
            <img
              src="https://skillicons.dev/icons?i=androidstudio,aws,cs,css,docker,eclipse,express,html,flask,git,java,js,nodejs,nextjs,postgres,postman,prisma,py,react,redux,sqlite,sequelize,tailwind,ts,visualstudio,vscode&perline=9&theme=light"
              alt=""
              className="w-96 drop-shadow-xl my-4 mx-auto"
            />
            <p className="my-3 text-sm md:text-base">
              Hi! I'm Chris! I'm a Full Stack Software Engineer with a Bachelors
              in Geography and International Development.
            </p>
            <p className="my-3 text-sm md:text-base">
              Before becoming a software engineer I was a Senior Solar Installer
              doing residential installations. My role meant quality and safe
              installations, for clients and my team, all within the span of one
              day. It was from this work that I learned I enjoyed creative
              problem solving and wanted a career in which I was always learning
              and constantly being challenged, as well as the sense of
              completion that comes from seeing a project in all aspects from
              start to finish.
            </p>
            <p className="my-3 text-sm md:text-base">
              I'm currently located in Portland, OR. But looking to relocate,
              given the right opportunity! I'm passionate about software that
              levels playing fields and changes the way we live our lives.
              Please feel free to contact me to discuss work opportunities or
              possible collaborations.
            </p>
            <h1 className="flex flex-row justify-around my-6">
              <Link
                to={{
                  pathname: `https://www.linkedin.com/in/christian-ludwell-047b18247/`,
                }}
                target="_blank"
                className=" transition ease-in-out duration-200 hover:scale-110 drop-shadow-xl"
              >
                <img
                  src="https://i.imgur.com/iiYBy1G.png"
                  alt="linkedinlogo"
                  className="object-cover w-12 drop-shadow-xl"
                />
              </Link>
              <Link
                to={{ pathname: "https://github.com/cludwell" }}
                target="_blank"
                className=" transition ease-in-out duration-200 hover:scale-110 drop-shadow-xl"
              >
                <img
                  src="https://i.imgur.com/KTjeA0w.png"
                  alt="githubicon"
                  className="object-cover w-10 contrast-200 drop-shadow-xl"
                />
              </Link>
              <Link
                to={{ pathname: "https://cludwell.github.io/#" }}
                target="_blank"
                className=" transition ease-in-out duration-200 hover:scale-110 drop-shadow-xl"
              >
                <PortfolioIcon />
              </Link>
            </h1>
          </div>
          <img
            src="https://i.imgur.com/JVy6TbT.jpg"
            alt="selfie"
            className="object-cover max-h-96 w-96 rounded-xl drop-shadow-lg ml-6 my-6 hidden sm:block"
          />
        </section>
        <section className="flex flex-col fade-in items-center lg:flex-row">
          <img
            className="object-cover rounded-xl md:mr-6 md:my-6 w-full max-w-2xl  aspect-video lg:aspect-square lg:w-96"
            src="https://i.imgur.com/YKuhXGy.png"
            alt="bandcamp-screen"
          />
          <div className="about-text">
            <h1 className=" font-serif text-2xl">Why Bandcamp</h1>
            <p className="my-3 text-sm md:text-base">
              I've been a huge fan of bandcamp's platform for a long time.
              They're one of the many platforms that has leveled the playing
              field between the major record companies and independent artists
              trying to connect with their fans. Their business model differs
              from some of the streaming sites like Spotify in that they allow
              artists to name and set their own prices for their records which
              Bandcamp takes a fraction of the proceeds. When you buy music on
              Bandcamp you own it inpertuity, at varying fidelities, even the
              highest flac files on par with vinyl. Imagine taking your vinyl
              records with you anywhere and never having to worry about them
              getting scratched or damaged in the heat.
            </p>
            <p className="my-3 text-sm md:text-base">
              In short, it's business model for enthusiasts that allows for more
              freedom for both artists and fans.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
