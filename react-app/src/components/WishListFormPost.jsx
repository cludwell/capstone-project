import { useDispatch, useSelector } from "react-redux";
import { fetchPostWish, fetchWishLists } from "../store/wishlists";
import { useEffect } from "react";
import { authenticate } from "../store/session";
import { fetchUsers } from "../store/users";

export default function WishListFormPost({ album }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);
  const user = useSelector((state) => state.session.user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newWish = { user_id: user.id, album_id: album.id };
    await dispatch(fetchPostWish(newWish));
    await dispatch(fetchUsers());
    await dispatch(fetchWishLists());
  };
  return (
      <span className=" cursor-pointer" onClick={handleSubmit}>
        <i
          className="fa-regular fa-heart text-black cursor-pointer"
          style={{
            color: album.Band.textColor ? album.Band.textColor : null,
          }}
        /> {" "} Wishlist
      </span>
  );
}
