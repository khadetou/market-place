import { useEffect } from "react";
import { getSellerProduct } from "@/redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
export default function Product() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSellerProduct());
  });
  return <div>This is the product page</div>;
}
