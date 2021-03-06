import nc from "next-connect";
import connectDB from "config/dbConnect";
import {
  getProductById,
  removeProduct,
  updateProduct,
} from "@/controllers/product";
import onError from "@/middlewares/errorMiddleware";
import { isAuthenticated, authorizeRoles } from "@/middlewares/auth";

const handler = nc({ onError });
connectDB();

handler.get(getProductById);

handler
  .use(isAuthenticated, authorizeRoles("Seller"))
  .put(updateProduct)
  .delete(removeProduct);

export default handler;
