import User from "@/models/user";
import bcryptjs from "bcryptjs";
import asyncHandler from "middleware/asyncHandler";
import absoluteUrl from "next-absolute-url";
import sendEmail from "@/utils/sendEmail";
import cloudinary from "cloudinary";

//CLOUDINARY SETTINGS
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//@Desc register user
//@Route Post/api/auth/register
//@Access public
export const registerUser = asyncHandler(async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "marketplace/avatars",
    width: "150",
    crop: "scale",
  });

  let { firstname, name, email, password } = req.body;
  const salt = await bcryptjs.genSalt(10);
  password = await bcryptjs.hash(password, salt);
  let user = await User.findOne({ email });
  if (user) {
    res.statu(400);
    throw Error("This email already exist!");
  }

  user = new User({
    firstname,
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  res.status(200).json(user);
});
