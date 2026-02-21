import {Product} from "../models/productModel.js";

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 8 } = req.query;

    const query = {
      title: { $regex: search, $options: "i" },
    };

    const products = await Product.find(query)
    
      .populate("user", "name")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// create products

export const createProduct = async (req, res) => {
  try {
    const { title, price, description } = req.body;

    if (!title || !price) {
      return res.status(400).json({
        message: "Title and price are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Product image is required",
      });
    }

    const product = await Product.create({
      title,
      price,
      description,
      images: [`/uploads/${req.file.filename}`],
      user: req.user.userId,
    });

    await product.populate("user", "name");

    res.status(201).json({
      _id: product._id,
      title: product.title,
      price: product.price,
      description: product.description,
      images: product.images,
      user: product.user.name,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// get single product

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // .populate("user", "name email")

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// update product

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Not authorized to update this product",
      });
    }

    Object.assign(product, req.body);

    const updated = await product.save();

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELET PRODUCT

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.user.toString() !== req.user.userId){
      return res.status(403).json({
        message: "Not authorized to delete this product",
      });
    }

    await product.deleteOne();

    res.json({ message: "Product removed" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

