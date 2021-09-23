import nc from "next-connect";
import connectDB from "config/dbConnect";
import {
  createProduct,
  getAllProduct,
  getAllSellerProduct,
  getProductByCategory,
} from "@/controllers/product";
import onError from "@/middlewares/errorMiddleware";
import { isAuthenticated, authorizeRoles } from "@/middlewares/auth";

const handler = nc({ onError });
connectDB();
handler.get(getAllProduct).get(getProductByCategory);

handler
  .use(isAuthenticated, authorizeRoles("Seller"))
  .post(createProduct)
  .get(getAllSellerProduct);

export default handler;
