import User from "@/models/user";
import bcryptjs from "bcryptjs";
import asyncHandler from "@/middlewares/asyncHandler";
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
  let { firstname, name, email, password, avatar } = req.body;

  const avatarObj = {};

  if (avatar) {
    const result = await cloudinary.v2.uploader.upload(avatar, {
      folder: "marketplace/avatars",
      width: "150",
      crop: "scale",
    });
    (avatarObj.public_id = result.public_id),
      (avatarObj.ur = result.secure_url);
  }

  const salt = await bcryptjs.genSalt(10);
  password = await bcryptjs.hash(password, salt);
  console.log("object");
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
    avatarObj,
  });

  res.status(200).json(user);
});
