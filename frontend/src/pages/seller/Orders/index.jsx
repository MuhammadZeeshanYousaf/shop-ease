import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import toast from "react-hot-toast"; // For toast notifications
import api from "../../../utils/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState(""); // For filtering orders by status

  // Fetch orders from API
  useEffect(() => {
    setLoading(true);
    api
      .get("/orders/seller", { params: { status: statusFilter } })
      .then(res => {
        if (res.data.ok) {
          setOrders(res.data.data);
        } else {
          toast.error(res.data.message);
        }
        setLoading(false);
      })
      .catch(err => {
        toast.error(err.response?.data?.message || err.message);
        setLoading(false);
      });
  }, [statusFilter]);

  // Handle status change for an order
  const handleStatusChange = (orderId, newStatus) => {
    api
      .patch(`/orders/${orderId}/status`, { status: newStatus })
      .then(res => {
        if (res.data.ok) {
          toast.success("Order status updated!");
          setOrders(prevOrders =>
            prevOrders.map(order => (order._id === orderId ? { ...order, status: newStatus } : order))
          );
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(err => {
        toast.error(err.response?.data?.message || err.message);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Orders Listing</h1>

      {/* Filter by Status */}
      <div className="mb-6">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Orders</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : orders.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Buyer</th>
              <th className="px-4 py-2 border">Total Price</th>
              <th className="px-4 py-2 border">Payment</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td className="px-4 py-2 border text-center">{order._id}</td>
                <td className="px-4 py-2 border text-center">{order.user.firstName}</td>
                <td className="px-4 py-2 border text-center">${order.totalPrice.toFixed(2)}</td>
                <td className="px-4 py-2 border text-center">{order.paymentDetails.method}</td>
                <td className="px-4 py-2 border text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      order.status === "pending"
                        ? "bg-yellow-200 text-yellow-700"
                        : order.status === "confirmed"
                        ? "bg-blue-200 text-blue-700"
                        : order.status === "shipped"
                        ? "bg-purple-200 text-purple-700"
                        : order.status === "delivered"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2 border text-center">
                  {/* Change Status */}
                  <div className="mb-2">
                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order._id, e.target.value)}
                      className="p-1 text-sm border border-gray-300 rounded-md"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </div>

                  {/* View Order Details */}
                  <Link to={`/orders/${order._id}`} className="btn px-4 py-1">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No orders found</p>
      )}
    </div>
  );
};

export default Orders;
