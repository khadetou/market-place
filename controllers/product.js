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

//@Desc update product
//@Route put/api/products/:id
//@Access private Seller
// const updateProduct = asyncHandler(async(req, res)=>{
//     const {}
// })
