import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../utils/api"; // Assuming this is your API instance
import { clearCart, removeFromCart } from "../store/cartSlice"; // Assuming this is your cart actions
import toast from "react-hot-toast";
import { formatCurrency } from "../utils/helpers"; // Utility to format the price

const Checkout = () => {
  const cart = useSelector(state => state.cart.items); // Get cart from Redux state
  const dispatch = useDispatch();
  const [cartProducts, setCartProducts] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    shippingAddress: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "credit_card",
  });

  // Fetch product details based on cart item IDs
  useEffect(() => {
    const itemIds = cart.map(item => item.id);
    if (itemIds.length > 0) {
      api
        .get("/products/specific", { params: { ids: itemIds.toString() } })
        .then(res => {
          if (res.data.ok) {
            setCartProducts(res.data.data); // Update cart products with API data
          } else {
            toast.error(res.data.message);
          }
        })
        .catch(e => console.error(e.response?.data?.message || e.message));
    } else {
      setCartProducts([]); // Clear cart products when no items are in the cart
    }
  }, [cart]);

  // Handle form input changes
  const handleInputChange = e => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Remove a single item from the cart
  const handleRemoveItem = productId => {
    dispatch(removeFromCart(productId));
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartProducts.reduce((total, product) => {
      const cartItem = cart.find(item => item.id === product._id);
      return total + product.price * cartItem.quantity;
    }, 0);
  };

  // Place order by submitting form
  const handlePlaceOrder = e => {
    e.preventDefault(); // Prevent default form submission

    const order = {
      products: cart.map(item => ({
        product: item.id,
        quantity: item.quantity,
        price: cartProducts.find(p => p._id === item.id)?.price || 0,
      })),
      totalPrice: calculateTotal(),
      shippingAddress: {
        address: orderDetails.shippingAddress,
        city: orderDetails.city,
        postalCode: orderDetails.postalCode,
        country: orderDetails.country,
      },
      paymentDetails: {
        method: orderDetails.paymentMethod,
        paymentStatus: "pending",
        paymentDate: null,
      },
    };

    // Call API to create the order
    api
      .post("/orders", order)
      .then(res => {
        if (res.data.ok) {
          toast.success("Order placed successfully!");
          setCartProducts([]);
          dispatch(clearCart()); // Clear the cart after placing the order
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(e => {
        toast.error(e.response?.data?.message || e.message);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Checkout</h1>

      {cartProducts.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            {cartProducts.map(product => {
              const cartItem = cart.find(item => item.id === product._id);
              return (
                <div
                  key={product._id}
                  className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-4"
                >
                  <div className="flex items-center">
                    <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
                    <div className="ml-4">
                      <h2 className="text-xl font-semibold">{product.name}</h2>
                      <p className="text-gray-500">Price: {formatCurrency(product.price)}</p>
                      <p className="text-gray-500">Quantity: {cartItem.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold">${product.price * cartItem.quantity}</p>
                    <button
                      onClick={() => handleRemoveItem(product._id)}
                      className="ml-4 bg-red-500 text-white px-2 py-1 rounded-full"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary & Form Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <p>Items in Cart:</p>
              <p>{cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
            </div>
            <div className="flex justify-between mb-4">
              <p>Total Price:</p>
              <p className="text-xl font-semibold">${calculateTotal().toFixed(2)}</p>
            </div>

            <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>
            <form onSubmit={handlePlaceOrder}>
              <input
                type="text"
                name="shippingAddress"
                value={orderDetails.shippingAddress}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
                placeholder="Shipping Address"
                required
              />
              <input
                type="text"
                name="city"
                value={orderDetails.city}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
                placeholder="City"
                required
              />
              <input
                type="text"
                name="postalCode"
                value={orderDetails.postalCode}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
                placeholder="Postal Code"
                required
              />
              <input
                type="text"
                name="country"
                value={orderDetails.country}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
                placeholder="Country"
                required
              />

              <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
              <select
                name="paymentMethod"
                value={orderDetails.paymentMethod}
                onChange={handleInputChange}
                className="w-full p-2 mb-4 border rounded"
                required
              >
                <option value="credit_card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="stripe">Stripe</option>
                <option value="cash_on_delivery">Cash on Delivery</option>
              </select>

              <button type="submit" className="bg-green-500 text-white w-full py-3 rounded-lg font-semibold">
                Place Order
              </button>
            </form>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty</p>
      )}
    </div>
  );
};

export default Checkout;
