import nc from "next-connect";
import connectDB from "config/dbConnect";
import { removeProduct } from "@/controllers/product";
import onError from "@/middlewares/errorMiddleware";
import { isAuthenticated, authorizeRoles } from "@/middlewares/auth";

const handler = nc({ onError });
connectDB();

handler.use(isAuthenticated, authorizeRoles("Admin")).delete(removeProduct);

export default handler;
