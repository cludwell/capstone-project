import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  deleteAlbumRequest,
  fetchAlbums,
  fetchSingleAlbum,
} from "../store/albums.js";
import { useHistory, useParams } from "react-router-dom";
import { fetchUserPurchases } from "../store/purchases.js";
import { NavLink } from "react-router-dom";
import { fetchUsers } from "../store/users.js";
import WishListFormPost from "./WishListFormPost/index.js";
import { deleteWishRequest, fetchWishLists } from "../store/wishlists.js";
import { fetchBandInfo } from "../store/bands.js";
import {
  deleteCartRequest,
  fetchUserCart,
  postCartRequest,
} from "../store/carts.js";
import ReactPlayer from "react-player";
import AudioPlayer from "./AudioPlayer.jsx";
import LyricsModal from "./LyricsModal.jsx";
import SongDeleteModal from "./SongDeleteModal.jsx";
import SongPostModal from "./SongPostModal.jsx";
import SongFormPut from "./SongFormPut.jsx";
import OpenModalButton from "./OpenModalButton/index.js";
import IconEdit from "./Icons/IconEdit.jsx";
import IconTrash from "./Icons/IconTrash.jsx";
import { Link } from "react-router-dom/cjs/react-router-dom.min.js";

export default function AlbumDetails() {
  const dispatch = useDispatch();
  const { albumId } = useParams();
  const history = useHistory();
  // const [ duration, setDuration ] = useState(0)
  //modal components
  const [showMenu, setShowMenu] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ulRef = useRef();
  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => {
      if (!ulRef.current?.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  const closeMenu = (e) => setShowMenu(false);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchSingleAlbum(albumId));
      await dispatch(fetchUserPurchases());
      await dispatch(fetchAlbums());
      await dispatch(fetchUsers());
      await dispatch(fetchWishLists());
      await dispatch(fetchUserCart());
      return setLoaded(true);
    };
    loadData();
  }, [dispatch, albumId]);

  const album = useSelector((state) => state.albums.singleAlbum);
  const albums = useSelector((state) => state.albums.allAlbums);
  const user = useSelector((state) => state.session.user);
  const wishes = useSelector((state) => state.wishes.userWishes);
  const cart = useSelector((state) => state.cart.userCart);
  const purchases = useSelector((state) => state.purchases.user);

  if (!loaded) return null;

  const editAlbum = (e) => {
    history.push(`/albums/${album.id}/edit`);
  };
  const deleteAlbum = async (e) => {
    await dispatch(deleteAlbumRequest(album.id));
    await dispatch(fetchBandInfo(album.bandId));
    history.push(`/bands/${album.bandId}`);
  };
  const deleteWish = async (e) => {
    const wishId = wishes.find(
      (w) => w.albumId === album.id && w.userId === user.id
    ).id;
    await dispatch(deleteWishRequest(wishId));
    await dispatch(fetchUsers());
    await dispatch(fetchWishLists());
  };
  const pleaseLogin = (e) => alert("Please log in to create a wishlist!");
  const buyAlbum = async (e) => {
    if (!user) return alert("Please sign in to add items to cart!");
    if (cart.some((c) => c.albumId === album.id))
      return alert("Item is already in cart.");
    await dispatch(
      postCartRequest({
        album_id: parseInt(album.id),
        user_id: parseInt(user.id),
      })
    );
  };
  const deleteCart = async (cartId) => {
    await dispatch(deleteCartRequest(cartId));
    await dispatch(fetchUserCart());
  };
  const songUrl =
    album && album.Songs && album.Songs.length
      ? album.Songs.find((s) => s.url)
      : null;

  const rgbaParser = (str) =>
    `rgba(${parseInt(str.slice(1, 3), 16)}, ${parseInt(
      str.slice(3, 5),
      16
    )}, ${parseInt(str.slice(5), 16)}, 0.8)`;

  const bandPage = (e) => {
    history.push(`/bands/${album.Band.id}`);
  };
  const modalButtonStyling =
    "bg-emerald-500 w-full my-1 p-1 uppercase mulish rounded-lg active:scale-95 active:bg-emerald-800 transition duration-200 ease-in-out text-sm text-white flex justify-center ";

  return (
    <div
      className="flex flex-col p-2 min-h-screen "
      style={
        album.Band.backgroundImage && album.Band.tiled
          ? {
              backgroundImage: `url(${album.Band.backgroundImage})`,
            }
          : album.Band.backgroundImage && !album.Band.tiled
          ? {
              backgroundImage: `url(${album.Band.backgroundImage})`,
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
            }
          : album.Band.backgroundColor
          ? {
              backgroundColor: album.Band.backgroundColor,
            }
          : null
      }
    >
      {album.Band && album.Band.bannerUrl && (
        <img
          src={`${album.Band.bannerUrl}`}
          onClick={bandPage}
          alt={`band logo banner ${album.Band.name}`}
          className="self-center max-h-80 w-full m-[3vmin] object-cover cursor-pointer fade-in max-w-screen-lg rounded-xl"
        />
      )}

      {album.youtube && (
        <div className="fade-in self-center">
          <ReactPlayer
            url={album.youtube}
            width={"90vmin"}
            height={"50vmin"}
            className="fade-in py-[3vmin]"
          />
        </div>
      )}

      <div
        className="self-center p-[2vmin] flex flex-row rounded-xl fade-in max-w-screen-lg gap-1"
        style={{
          backgroundColor: album.Band.backgroundColorSecondary
            ? rgbaParser(album.Band.backgroundColorSecondary)
            : null,
          color: album.Band.textColor ? album.Band.textColor : null,
        }}
      >
        <div className=" w-2/3" id="track-info-col">
          <h2 className=" sm:text-lg md:text-xl lg:text-2xl font-bold">
            {album.name}
          </h2>
          <p className="">by {album.Band.name}</p>
          <div className="">{songUrl && <AudioPlayer song={songUrl} />}</div>
          <div className="">
            {user &&
            purchases &&
            purchases.length &&
            purchases.some((p) => p.albumId === album.id) ? (
              <p>
                <i className="fa-solid fa-heart text-red-600 text-lg" />
                You Own This
              </p>
            ) : (
              <h3
                className=" text-indigo-500 hover:underline cursor-pointer"
                onClick={buyAlbum}
              >
                Buy Digital Album ${album.price}
              </h3>
            )}
            <p className=" text-green-500 text-sm">Streaming + Download</p>

            <table className=" w-full">
              {album && album.Songs && album.Songs.length
                ? album.Songs.sort((a, b) => a.trackNum - b.trackNum).map(
                    (s, i) => (
                      <tr key={`tr${i}`}>
                        <td key={`td${i}`}></td>
                        <td key={`td2${i}`} className="pr-2 text-sm">
                          {s.trackNum}.{" "}
                        </td>
                        <td key={`td3${i}`} className=" text-sm">
                          {s.name}
                        </td>
                        <td key={`td4${i}`} className="">
                          {s.lyrics && (
                            <OpenModalButton
                              key={`modallyric${i}`}
                              buttonText={
                                <button className={modalButtonStyling}>
                                  Lyrics
                                </button>
                              }
                              onItemClick={closeMenu}
                              modalComponent={<LyricsModal lyrics={s.lyrics} />}
                            />
                          )}
                        </td>
                        {user && album.Band.userId === user.id ? (
                          <>
                            <td key={`edit${i}`} className="">
                              <OpenModalButton
                                key={`modaleditsong${i}`}
                                buttonText={
                                  <button className={modalButtonStyling}>
                                    <IconEdit />
                                  </button>
                                }
                                onItemClick={closeMenu}
                                modalComponent={
                                  <SongFormPut albumId={album.id} song={s} />
                                }
                              />
                            </td>
                            <td key={`del${i}`} className="">
                              <OpenModalButton
                                key={`modaldeletesong${i}`}
                                buttonText={
                                  <button className={modalButtonStyling}>
                                    <IconTrash color={"white"} />
                                  </button>
                                }
                                onItemClick={closeMenu}
                                modalComponent={
                                  <SongDeleteModal album={album} song={s} />
                                }
                              />
                            </td>
                          </>
                        ) : null}
                      </tr>
                    )
                  )
                : null}
            </table>
            <p className=" my-8 ">
              Includes unlimited streaming via the free fancamp app, plus
              high-quality download in MP3, FLAC and more.
            </p>
          </div>

          <p className=" break-words ">{album.description}</p>
        </div>

        <div className="w-2/3 mx-4" id="album-image-col">
          <img
            src={`${album.albumImage}`}
            alt="albumartwork"
            className=" object-cover rounded-lg w-full mb-2"
          />
          <div className=" flex flex-row">
            {!user ? (
              //if the user is not signed in, they should be prompted to sign in
              <span className=" cursor-pointer" onClick={pleaseLogin}>
                <i className="fa-regular fa-heart notwislist-list" />
                WishList
              </span>
            ) : //
            user &&
              purchases &&
              purchases.length &&
              purchases.some((p) => p.albumId === album.id) ? (
              //if user is signed in and owns item already
              <span>
                <i className="fa-solid fa-heart purchased-list" />
                You Own This
              </span>
            ) : user && !wishes.some((w) => w.albumId === album.id) ? (
              <>
                <WishListFormPost album={album} />
                WishList
              </>
            ) : (
              <span onClick={deleteWish}>
                <i className="fa-solid fa-heart wished-for-list" />
                WishList
              </span>
            )}
          </div>
          <div className=" flex flex-row flex-wrap gap-2 my-4">
            {album.Sales.length
              ? album.Sales.map((s, i) => (
                  <NavLink to={`/users/${s.userId}`} key={`${i}`}>
                    <img
                      src={`${s.User.profilePic}`}
                      alt={`usersupporter${i}`}
                      className=" w-16 aspect-square object-cover gap-3 rounded-md"
                    ></img>
                  </NavLink>
                ))
              : null}
          </div>
        </div>

        <div className=" w-1/3 sm:text-xs">
          {user && cart && cart.length ? (
            <div className=" bg-gradient-to-b from-slate-200 to-slate-400 p-2 text-black rounded-lg outline-white outline-2 outline mb-4 ">
              <div className=" font-bold text-base">Shopping Cart</div>
              {user && cart && cart.length
                && cart.map((c, i) => (
                    <div className="" key={`cart${i}`}>
                      <div className="">{c.Album.name}</div>
                      <span className="">${c.Album.price} USD</span>
                      <span
                        className=" text-blue-700 float-right cursor-pointer"
                        onClick={() => deleteCart(c.id)}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </span>
                    </div>
                  ))
                }
              <hr></hr>
              <div className="mt-2">
                <span className="font-bold">Total</span>
                <span className=" float-right">
                  $
                  {cart
                    .reduce((acc, ele) => acc + ele.Album.price, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="cart-preview-buttons">
                {/* <OpenModalCheckOutPreview
                  buttonText={"Check Out"}
                  onItemClick={closeMenu}
                  modalComponent={<CheckOutModal user={user} cart={cart} />}
                /> */}
              </div>
            </div>
          ) : null}
          <img
            className=" object-cover aspect-square rounded-md w-56"
            alt="bandimagealbumdetails"
            src={`${album.Band.artistImage}`}
            onClick={bandPage}
          />
          <p className=" montserrat font-bold">{album.Band.country}</p>
          <p className=" montserrat text-slate-500">{album.Band.city}</p>

          {user &&
            album.Band.userId === user.id &&
            album.bandId === album.Band.id && (
              <div className="">
                <button
                  className="bg-teal-500 w-full my-1 p-1 uppercase mulish rounded-lg active:scale-95 active:bg-teal-800 transition duration-200 ease-in-out text-sm"
                  onClick={editAlbum}
                >
                  Edit Album
                </button>
                <button
                  className="bg-teal-500 w-full my-1 p-1 uppercase mulish rounded-lg active:scale-95 active:bg-teal-800 transition duration-200 ease-in-out text-sm"
                  onClick={deleteAlbum}
                >
                  Delete Album
                </button>
                <OpenModalButton
                  buttonText={
                    <button className="bg-teal-500 w-full my-1 p-1 uppercase mulish rounded-lg active:scale-95 active:bg-teal-800 transition duration-200 ease-in-out text-sm">
                      post song
                    </button>
                  }
                  onItemClick={closeMenu}
                  modalComponent={<SongPostModal albumId={album.id} />}
                />
              </div>
            )}

          <p>
            <a
              className=" text-indigo-500 visited:text-indigo-700 hover:underline montserrat"
              href={`https://www.facebook.com/search/top/?q=${album.Band.name
                .split(" ")
                .join("%20")}`}
            >
              Facebook
            </a>
          </p>

          <p>
            <Link
              className=" text-indigo-500 visited:text-indigo-700 hover:underline montserrat"
              href={`https://www.youtube.com/results?search_query=${album.Band.name
                .split(" ")
                .join("+")}`}
              target="_blank"
            >
              YouTube
            </Link>
          </p>

          <h4>
            <NavLink to={`/bands/${album?.bandId}`}>discography</NavLink>
          </h4>

          {Object.values(albums)
            .filter((a) => a.bandId === album.bandId && a.id !== album.id)
            .map((a, i) => (
              <NavLink
                to={`/albums/${a.id}`}
                className=" my-8"
                key={`discog${i}`}
              >
                <img
                  src={`${a.albumImage}`}
                  alt="otheralbums"
                  key={`albumart${i}`}
                  className=" w-56 aspect-square rounded-md"
                ></img>

                <div className=" font-bold montserrat">{a.name}</div>
                <div className="details-discog-created">
                  {a.createdAt.slice(0, -12)}
                </div>
              </NavLink>
            ))}
          <NavLink to={`/bands/${album.bandId}`}>
            <p className="details-more-releases">more releases...</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
