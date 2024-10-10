import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Product = model("Product", productSchema);

export default Product;
