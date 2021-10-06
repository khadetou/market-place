import Meta from "./Meta";
import Header from "./header/header";

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <Header />
      <div>{children}</div>
    </>
  );
}
