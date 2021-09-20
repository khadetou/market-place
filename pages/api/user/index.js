import nc from "next-connect";
import connectDB from "config/dbConnect";
import { getAllUsers, getUser } from "@/controllers/user";
import onError from "@/middlewares/errorMiddleware";
import { isAuthenticated, authorizeRoles } from "@/middlewares/auth";

const handler = nc({ onError });
connectDB();

handler.use(isAuthenticated).get(getUser);
handler.use(isAuthenticated, authorizeRoles("Admin")).get(getAllUsers);

export default handler;
