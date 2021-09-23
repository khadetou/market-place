import nc from "next-connect";
import connectDB from "config/dbConnect";
import { getProductByCategory } from "@/controllers/product";
import onError from "@/middlewares/errorMiddleware";

const handler = nc({ onError });
connectDB();
handler.get(getProductByCategory);

export default handler;
