import mongoose from "mongoose";
import Order from "../models/order.model.js";
import { parsePageQuery } from "./helpers/general.helper.js";

// Get orders for a specific user with pagination and sorting
export const getOrders = async (req, res) => {
  let sort = "desc",
    sortBy = "createdAt";
  
  // Handling query parameters for sorting
  if (["asc", "desc"].includes(req.query.sort)) sort = req.query.sort;
  if (["createdAt", "updatedAt"].includes(req.query.sortBy)) sortBy = req.query.sortBy;

  try {
    const { page, skip, limit } = parsePageQuery(req.query);

    // Fetch orders for the authenticated user
    const orders = await Order.find({ user: req.user.id })
      .sort({ [sortBy]: sort })
      .skip(skip)
      .limit(limit)
      .populate("products.product");  // Optional: Populates product details

    const totalOrders = await Order.countDocuments({ user: req.user.id });
    const totalPages = Math.ceil(totalOrders / limit);

    res.status(200).json({
      ok: true,
      data: orders,
      meta: {
        currentPage: page,
        totalPages,
        totalOrders,
      },
    });
  } catch (error) {
    console.error("Error in fetching orders:", error.message);
    res.status(500).json({ ok: false, message: "Server Error" });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  const { products, shippingAddress, paymentDetails } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ ok: false, message: "No products provided" });
  }

  try {
    // Calculate total price based on product quantity and price
    const totalPrice = products.reduce((total, item) => total + item.price * item.quantity, 0);

    const newOrder = new Order({
      user: req.user.id,
      products,
      totalPrice,
      shippingAddress,
      paymentDetails,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ ok: true, data: savedOrder });
  } catch (error) {
    console.error("Error in creating order:", error.message);
    res.status(500).json({ ok: false, message: "Server Error" });
  }
};

// Show a specific order by ID
export const showOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ ok: false, message: "Invalid order ID" });
  }

  try {
    const order = await Order.findOne({ _id: id, user: req.user.id }).populate("products.product");

    if (!order) {
      return res.status(404).json({ ok: false, message: "Order not found" });
    }

    res.status(200).json({ ok: true, data: order });
  } catch (error) {
    console.error("Error in fetching order:", error.message);
    res.status(500).json({ ok: false, message: "Server Error" });
  }
};

// Cancel an order (change status to 'canceled')
export const cancelOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ ok: false, message: "Invalid order ID" });
  }

  try {
    const order = await Order.findOne({ _id: id, user: req.user.id });

    if (!order) {
      return res.status(404).json({ ok: false, message: "Order not found" });
    }

    // Only allow cancellation if the order is not already canceled or delivered
    if (["canceled", "delivered"].includes(order.status)) {
      return res.status(400).json({ ok: false, message: `Order cannot be canceled as it is ${order.status}` });
    }

    order.status = "canceled";
    const updatedOrder = await order.save();

    res.status(200).json({ ok: true, data: updatedOrder });
  } catch (error) {
    console.error("Error in canceling order:", error.message);
    res.status(500).json({ ok: false, message: "Server Error" });
  }
};
