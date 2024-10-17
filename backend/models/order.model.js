import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

// Define the schema for Order
const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: SchemaTypes.ObjectId, // Reference to the Product model
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "canceled"], // Order status options
      default: "pending",
    },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentDetails: {
      method: {
        type: String,
        enum: ["credit_card", "paypal", "stripe", "cash_on_delivery"],
        required: true,
      },
      paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
      },
      paymentDate: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create the Order model
const Order = model("Order", orderSchema);

export default Order;
