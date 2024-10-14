import mongoose from "mongoose";
import { deleteByUrl } from "../config/upload.js";
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

// Post middleware for the update operation
productSchema.post("findOneAndUpdate", (doc) => deleteByUrl(doc.image)) // doc object must be older document
productSchema.post("findByIdAndDelete", (doc) => deleteByUrl(doc.image))

const Product = model("Product", productSchema);

export default Product;
