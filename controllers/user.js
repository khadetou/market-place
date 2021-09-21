import asyncHandler from "@/middlewares/asyncHandler";
import User from "@/models/user";
import Store from "@/models/store";
import absoluteUrl from "next-absolute-url";
import sendEmail from "@/utils/sendEmail";
import crypto from "crypto";

//@Desc get User
//@Route get/api/user
//@Access private

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json(user);
});

//@desc Update user
//@route put/api/user/:id
//@Access private

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { name, email, password } = req.body;

  if (user) {
    user.name = name;
    user.email = email;
    if (password) {
      //Encrypt Password
      const salt = await bcryptjs.genSalt(10);
      password = await bcryptjs.hash(password, salt);
      user.password = password;
    }
  }

  //Update the avatar
  if (avatar !== "") {
    const image_id = user.avatar.public_id;

    //Delete user previous image/avatar
    await cloudinary.v2.uploader.destroy(image_id);

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "marketplace/avatars",
      width: "150",
      crop: "scale",
    });

    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  await user.save();

  res.status(200).json({
    success: true,
  });
});

//@Desc delete a user
//@route delete/api/user/:id
//@Protect user is admin

export const deletUser = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (
    req.user._id.toString() === id.toString() ||
    req.user.role.includes("Admin")
  ) {
    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      throw Error("User not found");
    }
    await user.remove();
    res.json({ message: "User removed successfully!" });
  } else {
    res.status(401);
    res.json({ message: "Unthorized! " });
  }
});

//@Desc get All Users
//@route Get/api/user
//@Access private isAdmin

export const getAllUsers = asyncHandler(async (req, res) => {
  const query = req.query.new;
  console.log(query);
  const users = query
    ? await User.find().sort({ _id: -1 }).limit(5)
    : await User.find();
  console.log(users);
  res.json(users);
});

//@desc Forgot password
//@route put/api/password/forgot
//@Access public

export const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404);
    throw new Error("User not found with thi email");
  }

  //Get resetToken
  //Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hash and set to reset password field
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Set token expire time
  user.resetPasswordExpired = Date.now() + 30 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  //Get origin
  const { origin } = absoluteUrl(req);
  //Create a reset password url
  const resetUrl = `${origin}/password/reset/${resetToken}`;

  const message = `Your password reset url is as follow: \n\n${resetUrl} \n\n If you have not requested this email then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Marketplace Password Resset",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpired = undefined;
    await user.save({ validateBeforeSave: false });

    res.statu(500);
    throw new Error(error.message);
  }
});

//@desc reset password token
//@route put/api/password/reset/:token
//@Access private

export const resetPassword = asyncHandler(async (req, res, next) => {
  //Hash and set to reset password field
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.query.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpired: { $gt: Date.now() },
  });

  let { password, confirmPassword } = req.body;

  if (!user) {
    res.status(400);
    throw new Error("Password reset token is invalid or has been expired");
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passoword doesn't match");
  }

  //Set up the new password
  const salt = await bcryptjs.genSalt(10);
  password = await bcryptjs.hash(password, salt);

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpired = undefined;

  await user.save();
  res.status(200).json({
    user,
  });
});

//@route Post/api/store/:id
//@desc  Souscribtion to the Store
//@access Private

export const subscribe = asyncHandler(async (req, res) => {
  let store = await Store.findById(req.query.id);
  if (store) {
    const subscribed = store.subscription.find(
      (emails) => emails.email === req.user.email
    );

    if (subscribed) {
      store.subscription = store.subscription.filter(
        (emails) => emails.email !== req.customer.email
      );
      await trader.save();
      res.json({ msg: "unSubscribed" });
    } else {
      const follower = {
        firstname: req.user.firstname,
        name: req.user.name,
        email: req.user.email,
        user: req.user._id,
      };

      store.subscription.push(follower);
      await store.save();
      res.status(201).json({ msg: "Suscribed" });
    }
  }
});
