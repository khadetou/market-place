import styles from "@/styles/style.module.scss";
import { FiStar } from "react-icons/fi";
import { Store } from "@/components/icons";
import Image from "next/image";
export default function Card() {
  const {
    productCard,
    container,
    productCard__img,
    productCard__body,
    productCard__info,
    button,
    productCard__buttonRight,
    productCard__buttonLeft,
  } = styles;

  return (
    <div className={`${productCard} ${container}`}>
      <div className={productCard__img}>
        {
          <Image
            src="/images/shoe.png"
            width={1344}
            height={896}
            objectFit="cover"
          />
        }
      </div>
      <div className={productCard__body}>
        <div className={productCard__info}>
          <span>
            3.4 <FiStar />
          </span>
          <h3>$399</h3>
        </div>
        <h1>Nike</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
          quasi reiciendis eaque minus perferendis amet nesciunt, nulla,
          blanditiis vitae unde id laudantium voluptatibus, accusantium nisi!
        </p>
        <button className={`${button} ${productCard__buttonRight}`}>
          Ajouter au panier
        </button>
        <button className={`${button} ${productCard__buttonLeft}`}>
          <Store width="20px" height="20px" />
          Boutique
        </button>
      </div>
    </div>
  );
}
