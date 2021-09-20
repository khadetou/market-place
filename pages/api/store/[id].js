import nc from "next-connect";
import connectDB from "config/dbConnect";
import { getStoreById, updatStore, removeStore } from "@/controllers/store";
import onError from "@/middlewares/errorMiddleware";
import { isAuthenticated, authorizeRoles } from "@/middlewares/auth";

const handler = nc({ onError });
connectDB();

handler.get(getStoreById);
handler.use(isAuthenticated, authorizeRoles("Seller")).put(updatStore);
handler.use(isAuthenticated, authorizeRoles("Seller")).delete(removeStore);

export default handler;
