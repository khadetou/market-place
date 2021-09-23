import asyncHandler from "@/middlewares/asyncHandler";
import Store from "@/models/store";
import cloudinary from "cloudinary";

//@Desc create store
//@Route Post/api/store
//@Access private

//CLOUDINARY SETTINGS
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const createStore = asyncHandler(async (req, res) => {
  const { name, description, images, address, number } = req.body;

  let storeField = {};
  storeField.user = req.user._id;
  let imageLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "marketplace/stores",
    });

    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  if (imageLinks) storeField.images = imageLinks;
  if (name) storeField.name = name;
  if (description) storeField.description = description;
  if (address) storeField.address = address;
  if (number) storeField.number = number;

  let store = await Store.findOne({ user: req.user._id });

  store = new Store(storeField);
  await store.save();
  res.json(store);
});

//@Desc Create store review
//@Route post/api/store/:id
//@Access private
export const createStoreReview = asyncHandler(async (req, res) => {
  let store = await Store.findById(req.query.id);
  const { rating, comment } = req.body;
  if (store) {
    const alreadyReviewed = store.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw Error("Store already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    store.reviews.push(review);
    store.numReviews = store.reviews.length;
    store.rating =
      store.reviews.reduce((acc, item) => item.rating + acc, 0) /
      store.reviews.length;
    await store.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Store not found");
  }
});

//@Desc get all stores
//@Route Get/api/store
//@Access public
export const getAllStores = asyncHandler(async (req, res) => {
  //PAGINATION
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  //SEARCH
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Store.countDocument({ ...keyword });
  const stores = await Store.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ stores, page, pages: Math.ceil(count / pageSize) });
});

//@Desc Get a single Store
//@Route Get/api/store/:id
//@Access public
export const getStoreById = asyncHandler(async (req, res) => {
  const store = await Store.findById(req.query.id);

  if (store) {
    res.json(store);
  } else {
    res.status(404);
    throw new Error("Store not found!");
  }
});

//@Desc get top rated products
//@Route Get/api/store
//@Access public
export const getTopStores = asyncHandler(async (req, res) => {
  let stores = await Store.fnd({}).sort({ rating: -1 }).limit(5);

  res.json(stores);
});

//@Desc create store
//@Route put/api/store/:id
//@Access private
export const updatStore = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const { name, description, address, images } = req.body;

  let store = await Store.findById(id);
  if (req.user._id == store.user) {
    if (store) {
      if (images) {
        //Delete images associted with the room
        for (let i = 0; i < store.images.length; i++) {
          await cloudinary.v2.uploader.destroy(store.images[i].public_id);
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "marketplace/stores",
          });

          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }

        store.images = imagesLinks || store.images;
      }

      store.name = name || store.name;
      store.description = description || store.description;
      store.address = address || store.address;
    } else {
      res.status(400);
      throw Error("Store not found!");
    }
  } else {
    res.status(401);
    throw Error("UnAuthorized !");
  }
  const updatedStore = await store.save();
  res.json(updatedStore);
});

//@Desc Delete Store
//@Route delete/api/store/:id
//@Access private isSeller

export const removeStore = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const store = await Store.findById(id);
  if (req.user.id == store.id) {
    if (store) {
      //Delete images associted with the store
      for (let i = 0; i < store.images.length; i++) {
        await cloudinary.v2.uploader.destroy(store.images[i].public_id);
      }
      await store.remove();
      res.json({ message: "Store removed successfully!" });
    } else {
      res.status(404);
      throw Error("Store not found!");
    }
  } else {
    res.status(401);
    throw Error("UnAuthorized !");
  }
});
