import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer position="top-center" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
