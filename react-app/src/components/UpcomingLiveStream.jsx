import IconCalendar from "./Icons/IconCalendar";
import IconClock from "./Icons/IconClock";
import { NavLink } from "react-router-dom";

export default function UpcomingLiveStream({ album, ele }) {
  return (
    <NavLink to={`/bands/${album.bandId}`} className=" drop-shadow-lg">
      <div className=" bg-slate-300 rounded-lg">
        <div className="pb-2 w-56 ">
          <img
            src={`${album.Band.artistImage}`}
            alt="livestream-band"
            className="w-56 aspect-square object-cover rounded-t-lg"
          ></img>
          <div className=" mx-3 text-sm ">
            <div className="italic">{album.name.toUpperCase()}</div>
            <div className="font-bold">{album.Band.name}</div>
          </div>
          <div className="flex flex-row">
            <IconCalendar /> {ele[0]}
          </div>
          <div className="flex flex-row">
            <IconClock /> {ele[1]}
          </div>
        </div>
      </div>
    </NavLink>
  );
}
