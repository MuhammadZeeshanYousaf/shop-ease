import { useEffect, useState } from "react";
import OffCanvas from "../components/ui/Offcanvas";
import api from "../utils/api";
import toast from "react-hot-toast";
import { formatCurrency } from "../utils/helpers";

function CartCanvas({ show, onClose, onRemoveItem, cart }) {
  const [cartProducts, setCartProducts] = useState([]);

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

  function getQuantityOf(id) {
    const product = cart.find(p => p.id === id);
    return product?.quantity;
  }

  const getTotal = () => {
    const total = cartProducts.reduce((total, item) => {
      console.log("total:", total, "item: ", item);
      // Find the product with the same id
      const product = cart.find(product => product.id === item._id);

      // If product exists, calculate the total for this item
      if (product) {
        return total + product.quantity * item.price;
      }

      // Return total if product does not exist
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
                  <small className="text-sm text-gray-400 m-2 ">x&nbsp;{getQuantityOf(product._id)}</small>
                </h3>
                <p className="text-sm text-gray-500">{formatCurrency(product.price)}</p>
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

        <div className="flex justify-end mt-4">
          <p className="text-xl font-semibold">Total: {getTotal()}</p>
        </div>
      </div>
    </OffCanvas>
  );
}

export default CartCanvas;
