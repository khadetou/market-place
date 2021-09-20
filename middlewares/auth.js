import asyncHandler from "./asyncHandler";
import { getSession } from "next-auth/client";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const session = await getSession({ req });
  if (!session) {
    res.state(401);
    throw new Error("You need to be authenticated first");
  }

  req.user = session.user;
  next();
});

//Handling user roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log(roles);
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(
        `Role (${req.user.role}) is not allowed to access this ressource`
      );
    }
    next();
  };
};
