import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { wrapper } from "@/redux/store";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer position="top-center" />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
