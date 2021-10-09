import styles from "@/styles/style.module.scss";
import Image from "next/image";
import { FiStar } from "react-icons/fi";

export default function Card() {
  const {
    card,
    container,
    card__img,
    card__body,
    card__info,
    button,
    card__button,
  } = styles;
  return (
    <div className={`${card} ${container}`}>
      <div className={card__img}>
        <Image
          src="/images/store.png"
          width={1344}
          height={896}
          objectFit="cover"
        />
      </div>
      <div className={card__body}>
        <div className={card__info}>
          <span>
            3.4 <FiStar />
          </span>
          <h3>Location</h3>
        </div>
        <h1>title</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          voluptate iusto repellat distinctio,
        </p>
        <button className={`${button} ${card__button}`}>S'abonner</button>
      </div>
    </div>
  );
}
