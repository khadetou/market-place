import nc from "next-connect";
import connectDB from "config/dbConnect";
import { getAllStores, getTopStores, createStore } from "@/controllers/store";
import onError from "@/middlewares/errorMiddleware";
import { isAuthenticated, authorizeRoles } from "@/middlewares/auth";

const handler = nc({ onError });
connectDB();

handler.get(getAllStores).get(getTopStores);
handler.use(isAuthenticated, authorizeRoles("Seller")).post(createStore);

export default handler;
