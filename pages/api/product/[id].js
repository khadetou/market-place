import nc from "next-connect";
import connectDB from "config/dbConnect";
import { updateProduct } from "@/controllers/product";
import onError from "@/middlewares/errorMiddleware";
import { isAuthenticated, authorizeRoles } from "@/middlewares/auth";

const handler = nc({ onError });
connectDB();

handler.use(isAuthenticated, authorizeRoles("Seller")).put(updateProduct);

export default handler;
