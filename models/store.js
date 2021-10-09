import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const subscribersSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, sparse: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const storeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Enter the store name"],
    },
    description: {
      type: String,
      required: [true, "Enter a description"],
    },
    images: [
      {
        public_id: {
          type: String,
          required: [true, "Images are required"],
        },
        url: {
          type: String,
          required: [true, "Images are required"],
        },
        width: {
          type: Number,
          required: true,
        },
        height: {
          type: Number,
          required: true,
        },
      },
    ],
    subscription: [subscribersSchema],
    address: {
      type: String,
    },
    number: {
      type: String,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Store || mongoose.model("Store", storeSchema);
