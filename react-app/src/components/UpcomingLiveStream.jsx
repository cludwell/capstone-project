import IconCalendar from "./IconCalendar";
import IconClock from "./IconClock";
import { NavLink } from "react-router-dom";

export default function UpcomingLiveStream({ album, ele }) {
  return (
    <NavLink to={`/bands/${album.bandId}`}
    className=" h-fit w-40 sm:w-52 drop-shadow-lg">
      <div className=" bg-slate-300 rounded-lg">
        <div className="pb-2">
          <img
            src={`${album.Band.artistImage}`}
            alt="livestream-band"
            className="w-40 sm:w-52 object-cover rounded-t-lg aspect-square"
          ></img>
          <div className=" mx-3 text-sm sm:text-base">
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
