import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (_req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({ ok: true, data: products });
  } catch (error) {
    console.log("error in fetching products:", error.message);
    res.status(500).json({ ok: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // user will send this data

  if (!product.name || !product.price) {
    return res.status(400).json({ ok: false, message: "Please provide all required fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ ok: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create product:", error.message);
    res.status(500).json({ ok: false, message: "Server Error" });
  }
};

export const showProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ ok: false, message: "Invalid Product Id" });
  }

  try {
    const product = await Product.findById(id).exec();
    res.status(200).json({ ok: true, data: product });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ ok: false, message: "Invalid Product Id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ ok: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ ok: false, message: "Invalid Product Id" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ ok: true, message: "Product deleted" });
  } catch (error) {
    console.log("error in deleting product:", error.message);
    res.status(500).json({ ok: false, message: "Server Error" });
  }
};

export const getMyProducts = async (req, res) => {
  const userId = req.user.id;

  try {
    const products = await Product.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ ok: true, data: products });
  } catch (error) {
    console.log("Error in fetching products:", error.message);
    res.status(500).json({ ok: false, message: "Server Error" });
  }
};
