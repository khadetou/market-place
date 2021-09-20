import nc from "next-connect";
import connectDB from "config/dbConnect";
import {
  deletUser,
  getAllUsers,
  getUser,
  updateUser,
} from "@/controllers/user";
import onError from "@/middlewares/errorMiddleware";
import { isAuthenticated, authorizeRoles } from "@/middlewares/auth";

const handler = nc({ onError });
connectDB();

handler.use(isAuthenticated).get(getUser).put(updateUser);
handler.use(isAuthenticated, authorizeRoles("Admin")).get(getAllUsers);
handler.use(isAuthenticated, authorizeRoles("Admin")).delete(deletUser);
handler.use(isAuthenticated).delete(deletUser);
export default handler;
