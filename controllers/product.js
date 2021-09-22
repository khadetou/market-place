import Store from "@/models/store";
import asyncHandler from "@/middlewares/asyncHandler";
import cloudinary from "cloudinary";

//@Desc create product
//@Route post/api/product
//@Access private Seller
export const createProduct = asyncHandler(async (req, res) => {
  let store = await Store.findById(req.query.id);
  const { name, brand, category, description, price, countInStock, images } =
    req.body;
  let productField = {};
  let imagesLink = [];
  productField.user = req.user._id;

  if (store) {
    if (name) productField.name = name;
    if (brand) productField.brand = brand;
    if (category) productField.category = category;
    if (description) productField.description = description;
    if (price) productField.price = price;
    if (countInStock) productField.countInStock = countInStock;
    if (images) {
      for (let i = 0; i < images.lenght; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "marketplace/products",
        });
        imagesLink.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      productField.images = imagesLink;
    }
    store.products.push(productField);
    await store.save();
    res.json(store);
  } else {
    res.status(404);
    throw new Error("Store not found");
  }
});

//@Desc update product
//@Route put/api/products/:id
//@Access private Seller
// const updateProduct = asyncHandler(async(req, res)=>{
//     const {}
// })
