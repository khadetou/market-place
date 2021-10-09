import styles from "@/styles/style.module.scss";
import Image from "next/image";
import { FiStar } from "react-icons/fi";
import { Store } from "@/components/icons";

export default function Card() {
  const {
    cardProductSmall,
    container,
    cardProductSmall__img,
    cardProductSmall__body,
    cardProductSmall__info,
    button,
    cardProductSmall__buttonRight,
    cardProductSmall__buttonLeft,
  } = styles;
  return (
    <div className={`${cardProductSmall} ${container}`}>
      <div className={cardProductSmall__img}>
        <Image
          src="/images/shoe.png"
          width={1344}
          height={896}
          objectFit="cover"
        />
      </div>
      <div className={cardProductSmall__body}>
        <div className={cardProductSmall__info}>
          <span>
            3.4 <FiStar />
          </span>
          <h3>$339</h3>
        </div>
        <h1>Nike</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          ratione necessitatibus quis! Consectetur, odit nam error ea omnis et
          eligendi cum culpa molestiae maiores iusto.
        </p>
        <button className={`${button} ${cardProductSmall__buttonRight}`}>
          Ajouter Au panier
        </button>
        <button className={`${button} ${cardProductSmall__buttonLeft}`}>
          <Store height="16px" width="16px" />
          Boutique
        </button>
      </div>
    </div>
  );
}
