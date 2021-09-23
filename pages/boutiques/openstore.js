import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStore } from "@/redux/actions/boutique";
import { toast } from "react-toastify";
import { signOut } from "next-auth/client";

export default function Openstore() {
  const dispatch = useDispatch();
  const {} = useSelector((state) => state.Boutiques);

  const [values, setValues] = useState({
    name: "",
    description: "",
    address: "",
    number: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [images, setImage] = useState("");

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onChangeImage = (e) => {
    const files = Array.from(e.target.files);
    setImage([]);
    setImagePreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage((oldArray) => [...oldArray, reader.result]);
          setImagePreview((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const dataStore = {
      ...values,
      images,
    };
    if (images.length === 0) {
      return toast.error("Upload an image");
    }
    dispatch(createStore(dataStore));
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <input
        type="text"
        placeholder="Le nom de votre boutique"
        name="name"
        value={values.name}
        onChange={(e) => onChange(e)}
      />
      <input
        type="text"
        placeholder="description"
        name="description"
        value={values.description}
        onChange={(e) => onChange(e)}
      />
      <input
        type="text"
        placeholder="Numero telephone"
        name="number"
        value={values.number}
        onChange={(e) => onChange(e)}
      />
      <input
        type="text"
        placeholder="Address"
        name="address"
        value={values.address}
        onChange={(e) => onChange(e)}
      />
      <input
        type="file"
        placeholder="L'image"
        name="images"
        multiple
        onChange={(e) => onChangeImage(e)}
      />
      <button type="submit">submit</button>
    </form>
  );
}
