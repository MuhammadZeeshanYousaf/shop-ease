import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import { addToCart, decrementFromCart } from "../../store/cartSlice";
import QuantityChip from "./QuantityChip";
import { useLayoutEffect, useState } from "react";

const ProductCard = ({ product }) => {
  const cart = useSelector(state => state.cart);
  const [cartProduct, setCartProduct] = useState(null);
  const dispatch = useDispatch();

  const handleAddToCart = id => () => {
    dispatch(addToCart(id));
  };

  useLayoutEffect(() => {
    const cartItem = cart.find(p => p.id === product._id);
    if (cartItem) setCartProduct(cartItem);
    else setCartProduct(null);
  }, [cart, product._id, cartProduct?.quantity]);

  return (
    <div key={product._id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      {/* Product Image */}
      <img className="w-full h-48 object-cover" src={"https://via.placeholder.com/300x200"} alt="Product Image" />
      {/* Card Content */}
      <div className="p-5">
        {/* Product Name */}
        <h5 className="text-lg font-semibold tracking-tight text-gray-900">{product.name}</h5>
        {/* Price */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-bold text-fuchsia-600">{formatCurrency(product.price)}</span>
          <span className="text-gray-500 line-through">$129.99</span>
        </div>
        {/* Description */}
        <p className="mt-2 text-gray-500">A perfect modern chair for your living room.</p>
        {/* Buttons */}
        <div className="flex justify-between items-center mt-4">
          {cartProduct ? (
            <QuantityChip
              quantity={cartProduct.quantity}
              onIncrement={() => dispatch(addToCart(cartProduct.id))}
              onDecrement={() => dispatch(decrementFromCart(cartProduct.id))}
            />
          ) : (
            <button
              onClick={handleAddToCart(product._id)}
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              <i className="fa fa-cart-plus"></i>&ensp;Add to Cart
            </button>
          )}
          <a href="#" className="text-fuchsia-600 hover:underline">
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
