import Store from "@/models/store";
import Product from "@/models/product";
import asyncHandler from "@/middlewares/asyncHandler";
import cloudinary from "cloudinary";

//@Desc create product
//@Route post/api/product
//@Access private Seller

export const createProduct = asyncHandler(async (req, res) => {
  let store = await Store.findOne({ user: req.user._id });

  const { name, brand, category, description, price, countInStock, images } =
    req.body;

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
      });
    }

    if (imageLinks) productField.images = imageLinks;

    if (name) productField.name = name;
    if (brand) productField.brand = brand;
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

//@Desc Get All Products
//@Route Get/api/product
//@Access Seller
export const getAllSellerProduct = asyncHandler(async (req, res) => {
  let store = await Store.findOne({ user: req.user._id });
  let product = await Product.find({ store: store._id });
  res.json(product);
});

//@Desc update product
//@Route put/api/products/:id
//@Access private Seller

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, brand, category, description, price, countInStock, images } =
    req.body;

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
        });
      }

      product.images = imagesLinks || images;
    }

    (product.name = name || product.name),
      (product.brand = brand || product.brand),
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
