import { NavLink } from "react-router-dom";

export default function NewAndNotable({ album }) {
  return (
    <NavLink to={`/albums/${album.id}`}
    className="drop-shadow-xl">
      <div className="bg-slate-300 rounded-lg">
        <img
          src={`${album.albumImage}`}
          alt="album-im"
          className=" aspect-square object-cover rounded-t-lg w-56"
        />
        <div className=" text-sm p-2 w-56 h-80 overflow-hidden">
          <section className=" italic text-base ">
            {album.name.toUpperCase()}
          </section>
          <section className=" text-purple-800 text-xs">{album.genre}</section>
          <section className=" text-xs ">
            {album.description.slice(0,500)}
          </section>
        </div>
      </div>
    </NavLink>
  );
}
