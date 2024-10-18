import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import toast from "react-hot-toast"; // For toast notifications
import ViewOrder from "./View";
import api from "../../../utils/api";

const Orders = () => {
  const navigate = useNavigate();
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
    <div className="mx-auto">
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
        <div className="flex justify-center my-8">
          <div className="animate-spin h-9 w-9 border-t-4 border-b-4 border-fuchsia-600 rounded-full"></div>
        </div>
      ) : orders.length > 0 ? (
        <table className="min-w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 border text-gray-700">Order ID</th>
              <th className="px-4 py-3 border text-gray-700">Buyer</th>
              <th className="px-4 py-3 border text-gray-700">Total Price</th>
              <th className="px-4 py-3 border text-gray-700">Payment</th>
              <th className="px-4 py-3 border text-gray-700">Status</th>
              {/* <th className="px-4 py-3 border text-gray-700">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`${order._id}/view`)}
              >
                <td className="px-4 py-3 text-center">{order._id}</td>
                <td className="px-4 py-3 text-center">{order.user.firstName}</td>
                <td className="px-4 py-3 text-center">${order.totalPrice.toFixed(2)}</td>
                <td className="px-4 py-3 text-center">{order.paymentDetails.method}</td>
                <td className="px-4 py-3 text-center" onClick={e => e.stopPropagation()}>
                  {/* Show and Change Status */}
                  <select
                    value={order.status}
                    onChange={e => handleStatusChange(order._id, e.target.value)}
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
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </td>
                {/* <td className="px-4 py-2 text-center"> */}
                  {/* View Order Details */}
                  {/* <Link to={`${order._id}/view`} onClick={e => e.stopPropagation()} className="btn px-4 py-1">
                    View Details
                  </Link> */}
                {/* </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No orders found</p>
      )}

      {/* Child Routes definition that need to render along with Orders */}
      <Routes>
        <Route path=":orderId/view" element={<ViewOrder />} />
      </Routes>
    </div>
  );
};

export default Orders;
