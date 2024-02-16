import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PortfolioIcon from "./Icons/IconPortfolio";
export default function Footer() {
  const album = useSelector((state) => state.albums.singleAlbum);
  const band = useSelector((state) => state.bands.singleBand);
  const rgbaParser = (str) =>
    `rgba(${parseInt(str.slice(1, 3), 16)}, ${parseInt(
      str.slice(3, 5),
      16
    )}, ${parseInt(str.slice(5), 16)}, 0.8)`;

  return (
    <div
      className="flex flex-row flex-wrap w-full min-h-96 bg-slate-600  justify-center pb-16 fade-in"
      style={{
        backgroundColor: album?.Band?.backgroundColorSecondary
          ? rgbaParser(album.Band.backgroundColorSecondary)
          : band && band.backgroundColorSecondary
          ? rgbaParser(band.backgroundColorSecondary)
          : null,
        color:
          album && album.Band && album.Band.textColor
            ? album.Band.textColor
            : band && band.textColor
            ? band.textColor
            : null,
      }}
    >
      <div className=" w-96 mt-16 mx-16">
        <p className="text-5xl ml-4">🤘</p>
        <p
        className="my-2 font-serif marcellus text-xl"
          style={{
            color:
              album && album.Band && album.Band.textColor
                ? album.Band.textColor
                : band && band.textColor
                ? band.textColor
                : null,
          }}
        >
          Fancamp Industries Ltd.
        </p>
        <p
        className="my-2 font-serif marcellus text-xl"
          style={{
            color:
              album && album.Band && album.Band.textColor
                ? album.Band.textColor
                : band && band.textColor
                ? band.textColor
                : null,
          }}
        >
          Providing audio streaming since 2023
        </p>
      </div>
      <div className=" w-96 mt-16 mx-16">
        <h2 className=" font-bold text-2xl marcellus">SOCIALS </h2>
        <span className="flex flex-row gap-6 my-4">
          <Link
            to={{
              pathname: `https://www.linkedin.com/in/christian-ludwell-047b18247/`,
            }}
            target="_blank"
            className=" transition ease-in-out duration-200 hover:scale-110 drop-shadow-xl "
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
              className={`object-cover w-10 contrast-200`}
            />
          </Link>
          <Link
            to={{ pathname: "https://cludwell.github.io/#" }}
            target="_blank"
            className=" transition ease-in-out duration-200 hover:scale-110 drop-shadow-xl"
          >
            <PortfolioIcon />
          </Link>
        </span>
      </div>
    </div>
  );
}
