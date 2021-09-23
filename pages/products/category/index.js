import { useEffect } from "react";
import {
  getProductByCategory,
  getSellerProduct,
} from "@/redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
export default function Product() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.Products);

  useEffect(() => {
    if (!products) {
      dispatch(getSellerProduct());
    } else {
      dispatch(getProductByCategory(products.product[0].category));
    }
  }, [products]);
  return <div>This is the product page</div>;
}
