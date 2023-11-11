import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkOutRequest,
  fetchUserCart,
  deleteCartRequest,
} from "../store/carts";
import { fetchWishLists, deleteWishRequest } from "../store/wishlists";
import { postPurchaseRequest } from "../store/purchases";
import IconCart from "./IconCart";
import Modal from "./Modal";
import IconTrash from "./IconTrash";

export default function CartModal({ user, album, band }) {
  const dispatch = useDispatch();
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    dispatch(fetchUserCart());
    dispatch(fetchWishLists());
  }, [dispatch]);
  const cart = useSelector((state) => state.cart.userCart);
  const wishes = useSelector((state) => state.wishes.userWishes);
  const deleteCart = async (cartId) => {
    await dispatch(deleteCartRequest(cartId));
    await dispatch(fetchUserCart());
  };
  const checkOut = async (e) => {
    if (!cart.length) setOpenCart(false);
    await dispatch(checkOutRequest());
    await dispatch(fetchUserCart());
    for (const item in cart) {
      await dispatch(
        postPurchaseRequest({
          album_id: cart[item].albumId,
          user_id: parseInt(user.id),
          price: cart[item].Album.price,
        })
      );
    }
    const cartIds = cart.map((c) => c.albumId);
    const wishedAndBought = wishes.filter((w) => cartIds.includes(w.albumId));
    if (wishedAndBought.length) {
      for (const wish in wishedAndBought) {
        await dispatch(deleteWishRequest(wishedAndBought[wish].id));
      }
    }
    return setOpenCart(false);
  };
  return (
    <>
      <button onClick={() => setOpenCart((prev) => !prev)}>
        <IconCart album={album} band={band} />
      </button>
      <Modal open={openCart} setOpen={setOpenCart}>
        <h2 className="text-center text-xl font-bold mb-6 montserrat">
          Shopping Cart
        </h2>
        <table></table>

        {user &&
          cart &&
          cart.length &&
          cart.map((item, i) => (
            <div
              className=" flex flex-row justify-between w-full my-2"
              key={`cart${i}`}
            >
              <div className=" w-full">{item.Album.name}</div>
              <div className=" flex flex-row">
                ${item.Album.price}
                <button onClick={() => deleteCart(item.id)}>
                  <IconTrash color={"red"} classes={"hover:scale-110 transition ease-in-out duration-200"}/>
                </button>
              </div>
            </div>
          ))}
        <hr />
        <div className="flex flex-row justify-between my-4">
          <div className="font-bold">Total</div>
          <div>
            ${cart.reduce((acc, ele) => acc + ele.Album.price, 0).toFixed(2)}
          </div>
        </div>
        <div className="flex flex-col ">
          <img
            src="https://i.imgur.com/QfGSupn.png"
            alt="payment-methods"
            className=" w-96"
          />
          <button
            className="bg-green-500 text-white font-bold uppercase p-3 rounded-lg transition duration-200  active:bg-green-800 active:scale-90 montserrat m-8"
            onClick={checkOut}
          >
            Pay Now
          </button>
        </div>
      </Modal>
    </>
  );
}
