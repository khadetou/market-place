import nc from "next-connect";
import connectDB from "config/dbConnect";
import { deletUser, updateUser } from "@/controllers/user";
import onError from "@/middlewares/errorMiddleware";
import { isAuthenticated, authorizeRoles } from "@/middlewares/auth";

const handler = nc({ onError });
connectDB();
handler.use(isAuthenticated, authorizeRoles("User", "Admin")).delete(deletUser);
export default handler;
