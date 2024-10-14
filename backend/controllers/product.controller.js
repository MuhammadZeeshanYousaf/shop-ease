import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { parsePageQuery } from "./helpers/general.helper.js";

export const getProducts = async (req, res) => {
  let sort = "desc",
    sortBy = "createdAt";
  if (["asc", "desc"].includes(req.query.sort)) sort = req.query.sort;
  if (["createdAt", "updatedAt"].includes(req.query.sortBy)) sortBy = req.query.sortBy;

  try {
    const { page, skip, limit } = parsePageQuery(req.query);
    const products = await Product.find({})
      .sort({ [sortBy]: sort })
      .skip(skip)
      .limit(limit);
    const totalProducts = await Product.countDocuments({});
    const totalPages = Math.ceil(totalProducts / limit);
    res.status(200).json({ ok: true, data: products, meta: { currentPage: page, totalPages } });
  } catch (error) {
    console.log("Error in fetching products:", error.message);
    res.status(500).json({ ok: false, message: "Server Error" });
  }
};

export const getSpecificProducts = async (req, res) => {
  const productIds = req.query.ids;

  try {
    let products = [];
    if (productIds) products = await Product.find({ _id: { $in: productIds.split(",") } });
    res.status(200).json({ ok: true, data: products });
  } catch (error) {
    console.log("Error in fetching products:", error.message);
    res.status(500).json({ ok: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price } = req.body; // user will send this data
  const image = req.file ? req.file.path ?? req.file.location : "";
  console.log("Product uploaded Image:", req.file);
  console.log("Product image:", image);

  if (!name || !price) {
    return res.status(400).json({ ok: false, message: "Please provide all required fields" });
  }

  const newProduct = new Product({ name, price, user: req.user.id, image });

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
