import styles from "@/styles/style.module.scss";
import { FiStar } from "react-icons/fi";
import { Store } from "@/components/icons";
import Image from "next/image";
import { useState } from "react";
export default function Card() {
  const {
    productCard,
    container,
    productCard__imgPortrait,
    productCard__imgLandscape,
    productCard__body,
    productCard__back,
    productCard__info,
    productCard__landscape,
    button,
    productCard__buttonRight,
    productCard__buttonLeft,
  } = styles;

  const [portrait, setPortrait] = useState(false);

  return (
    <div
      className={
        portrait
          ? `${productCard} ${container}`
          : `${productCard} ${container} ${productCard__landscape}`
      }
    >
      {!portrait ? (
        <div className={productCard__imgLandscape}>
          <Image
            src="/images/shoe.png"
            width={1344}
            height={896}
            objectFit="cover"
          />
        </div>
      ) : (
        <div className={productCard__imgPortrait}>
          <Image
            src="/images/portrait.jpg"
            width={951}
            height={1190}
            objectFit="cover"
          />
        </div>
      )}
      <div
        className={
          portrait
            ? `${productCard__body} ${productCard__back}`
            : productCard__body
        }
      >
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
      </div>
      <button className={`${button} ${productCard__buttonRight}`}>
        Ajouter au panier
      </button>
      <button className={`${button} ${productCard__buttonLeft}`}>
        <Store width="20px" height="20px" />
        Boutique
      </button>
    </div>
  );
}
