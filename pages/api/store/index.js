import nc from "next-connect";
import connectDB from "config/dbConnect";
import { getAllStores, getTopStores, createStore } from "@/controllers/store";
import onError from "@/middlewares/errorMiddleware";
import { isAuthenticated, authorizeRoles } from "@/middlewares/auth";

const handler = nc({ onError });
connectDB();

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "50mb",
//     },
//   },
// };

handler.use(isAuthenticated, authorizeRoles("Seller")).post(createStore);
handler.get(getAllStores).get(getTopStores);

export default handler;
