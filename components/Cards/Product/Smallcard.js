import styles from "@/styles/style.module.scss";
import Image from "next/image";
import { FiStar } from "react-icons/fi";
import { Store } from "@/components/icons";
import { useState } from "react";

export default function Card() {
  const [portrait, setPortrait] = useState(false);
  const {
    cardProductSmall,
    container,
    cardProductSmall__imgPortrait,
    cardProductSmall__imgLandscape,
    cardProductSmall__back,
    cardProductSmall__body,
    cardProductSmall__info,
    cardProductSmall__landscape,
    button,
    cardProductSmall__buttonRight,
    cardProductSmall__buttonLeft,
  } = styles;
  return (
    <div
      className={
        portrait
          ? `${cardProductSmall} ${container}`
          : `${cardProductSmall} ${container} ${cardProductSmall__landscape}`
      }
    >
      {!portrait ? (
        <div className={cardProductSmall__imgLandscape}>
          <Image
            src="/images/shoe.png"
            width={1344}
            height={896}
            objectFit="cover"
          />
        </div>
      ) : (
        <div className={cardProductSmall__imgPortrait}>
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
            ? `${cardProductSmall__body} ${cardProductSmall__back}`
            : cardProductSmall__body
        }
      >
        <div className={cardProductSmall__info}>
          <span>
            3.4 <FiStar />
          </span>
          <p>34 reviews</p>
          <h3>10.000 fr cfa</h3>
        </div>
        <h1>Nike</h1>

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
          quasi reiciendis eaque minus perferendis amet nesciunt, nulla,
          blanditiis vitae unde id laudantium voluptatibus, accusantium nisi!
        </p>
      </div>
      <button className={`${button} ${cardProductSmall__buttonRight}`}>
        Ajouter Au panier
      </button>
      <button className={`${button} ${cardProductSmall__buttonLeft}`}>
        <Store height="16px" width="16px" />
        Boutique
      </button>
    </div>
  );
}
