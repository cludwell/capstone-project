import { NavLink } from "react-router-dom";

export default function NewAndNotable({ album }) {
  return (
    <NavLink to={`/albums/${album.id}`}
    className="w-56 drop-shadow-xl">
      <div className="bg-slate-300 rounded-lg">
        <img
          src={`${album.albumImage}`}
          alt="album-im"
          className=" aspect-square object-cover rounded-t-lg h-56 w-56"
        />
        <div className=" text-sm p-2 h-48 overflow-hidden overflow-ellipsis w-56 ">
          <section className=" italic text-base ">
            {album.name.toUpperCase()}
          </section>
          <section className=" text-purple-800 text-xs">{album.genre}</section>
          <section className=" text-xs">
            {album.description}
            {/* {album.description.length > 490 && <span>...</span>} */}
          </section>
        </div>
      </div>
    </NavLink>
  );
}
