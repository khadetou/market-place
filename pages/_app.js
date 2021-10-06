import "../styles/globals.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { wrapper } from "@/redux/store";
import Layout from "@/components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <ToastContainer position="top-center" />
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
