import { useEffect, useState } from "react";
import OffCanvas from "../components/ui/Offcanvas";
import api from "../utils/api";
import toast from "react-hot-toast";
import { formatCurrency } from "../utils/helpers";
import QuantityChip from "../components/ui/QuantityChip";
import { addToCart, decrementFromCart } from "../store/cartSlice";
import { useDispatch } from "react-redux";

function CartCanvas({ show, onClose, onRemoveItem, cart, onCheckout }) {
  const [cartProducts, setCartProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const itemIds = cart.map(item => item.id);
    if (show)
      api
        .get("/products/specific", { params: { ids: itemIds.toString() } })
        .then(res => {
          if (res.data.ok) {
            setCartProducts(res.data.data);
          } else toast(res.data.message);
        })
        .catch(e => console.log(e.response.data.message || e.message));
    else setCartProducts(prev => prev.filter(p => !itemIds.includes(p._id)));
  }, [show, cart]);

  const getQuantityOf = id => {
    const product = cart.find(p => p.id === id);
    return product?.quantity;
  };

  const getTotal = () => {
    const total = cartProducts.reduce((total, item) => {
      const product = cart.find(product => product.id === item._id);
      // If product exists, calculate the total for this item
      if (product) return total + product.quantity * item.price;

      // Return total to reducer if product does not exist
      return total;
    }, 0);

    return formatCurrency(total);
  };

  return (
    <OffCanvas title="Cart" show={show} onClose={onClose}>
      <div className="bg-white p-2">
        {cartProducts.length > 0 ? (
          cartProducts.map(product => (
            <div key={product._id} className="flex items-center mb-4">
              <img
                alt="Open book in a library"
                className="w-24 h-24 object-cover rounded-lg mr-4"
                height={100}
                src="https://via.placeholder.com/100x100"
                width={100}
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  {product.name}
                  {/* <small className="text-sm text-gray-400 m-2 ">x&nbsp;{getQuantityOf(product._id)}</small> */}
                </h3>
                <p className="text-sm text-gray-500">{formatCurrency(product.price)}</p>
                <QuantityChip
                  quantity={getQuantityOf(product._id)}
                  onIncrement={() => dispatch(addToCart(product._id))}
                  onDecrement={() => dispatch(decrementFromCart(product._id))}
                />
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">{formatCurrency(getQuantityOf(product._id) * product.price)}</p>
                <button
                  onClick={onRemoveItem(product._id)}
                  className="border border-rose-500 px-2 rounded-lg text-rose-500 hover:bg-rose-500 hover:text-white"
                >
                  &times;
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center italic my-10">No item in cart</p>
        )}

        <div className="flex justify-between mt-4 border-t-2 pt-3">
          <p className="text-xl font-semibold">Total:</p>
          <p className="text-xl font-semibold">{getTotal()}</p>
        </div>

        <div className="mt-5">
          <button onClick={onCheckout} className="btn w-full" disabled={cart.length < 1}>
            Checkout
          </button>
        </div>
      </div>
    </OffCanvas>
  );
}

export default CartCanvas;
