import Store from "@/models/store";
import Product from "@/models/product";
import asyncHandler from "@/middlewares/asyncHandler";
import cloudinary from "cloudinary";

//@Desc create product
//@Route post/api/product
//@Access private Seller

//CLOUDINARY SETTINGS
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const createProduct = asyncHandler(async (req, res) => {
  let store = await Store.findOne({ user: req.user._id });

  const {
    name,
    brand,
    category,
    description,
    price,
    countInStock,
    images,
    size,
  } = req.body;

  let productField = {};
  let imageLinks = [];
  if (req.user._id.toString() === store.user.toString()) {
    productField.user = req.user._id;
    productField.store = store._id;
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "marketplace/products",
      });

      imageLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height,
      });
    }

    if (imageLinks) productField.images = imageLinks;

    if (name) productField.name = name;
    if (brand) productField.brand = brand;
    if (size) productField.size = size;
    if (category) productField.category = category;
    if (description) productField.description = description;
    if (price) productField.price = price;
    if (countInStock) productField.countInStock = countInStock;

    let product = await Product.findOne({ user: req.user._id });

    product = new Product(productField);
    await product.save();
    res.json(product);
  } else {
    res.status(400);
    throw new Error("The the ids do not match!");
  }
});

//@Desc Get All Seller Products
//@Route Get/api/product
//@Access Seller
export const getAllSellerProduct = asyncHandler(async (req, res) => {
  let store = await Store.findOne({ user: req.user._id });
  let product = await Product.find({ store: store._id });

  res.json(product);
});

//@Desc Get All Products
//@Route Get/api/product
//@Access Seller
export const getAllProduct = asyncHandler(async (req, res) => {
  //PAGINATION
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  //SEARCH BACKEND FUNCTIONNALITY
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $option: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@Desc Get Products By Category
//@Route Get/api/product
//@Access Seller
export const getProductByCategory = asyncHandler(async (req, res) => {
  //PAGINATION
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const { category } = req.query;
  let products = await Product.find({ category: category })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@Desc get product by id
//@Route Get/api/products/:id
//@Access public
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found!");
  }
  res.json(product);
});

//@Desc delete product
//@Route delete/api/products/:id
//@Access private admin || seller
export const removeProduct = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const product = await Product.findById(id);
  if (
    req.user._id.toString() === product.user.toString() ||
    req.user.role.includes("Admin")
  ) {
    if (product) {
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
      await product.remove();
      res.json({ message: "Product deleted successfully!" });
    } else {
      res.status(404);
      throw new Error("Product not found!");
    }
  }
});

//@Desc update product
//@Route put/api/products/:id
//@Access private Seller

export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    category,
    description,
    price,
    countInStock,
    images,
    size,
  } = req.body;

  let product = await Product.findById(req.query.id);
  if (req.user._id.toString() !== product.id) {
    res.status(403);
    throw new Error("UnAuthorized !");
  }

  if (product) {
    if (images) {
      //Delete images associted with the room
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }

      let imagesLinks = [];

      for (let i = 0; i < req.body.images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(req.body.images[i], {
          folder: "bookit/rooms",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
          width: result.width,
          height: result.height,
        });
      }

      product.images = imagesLinks || images;
    }

    (product.name = name || product.name),
      (product.brand = brand || product.brand),
      (product.size = size || product.size),
      (product.category = category || product.category),
      (product.description = description || product.description),
      (product.price = price || product.price),
      (product.countInStock = countInStock || product.countInStock);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});
