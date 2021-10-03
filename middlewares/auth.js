import asyncHandler from "./asyncHandler";
import { getSession } from "next-auth/client";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401);
    throw new Error("You need to be authenticated first");
  }

  req.user = session.user;
  next();
});

//Handling user roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user.role.includes(...roles)) {
      res.status(403);
      throw new Error(
        `Role (${req.user.role}) is not allowed to access this ressource`
      );
    }
    next();
  };
};
