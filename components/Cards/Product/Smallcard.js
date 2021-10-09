import styles from "@/styles/style.module.scss";
import Image from "next/image";
import { FiStar } from "react-icons/fi";

export default function Card() {
  const {
    cardSmall,
    container,
    cardSmall__img,
    cardSmall__body,
    cardSmall__info,
    button,
    cardSmall__button,
  } = styles;
  return (
    <div className={`${cardSmall} ${container}`}>
      <div className={cardSmall__img}>
        <Image
          src="/images/store.png"
          width={1344}
          height={896}
          objectFit="cover"
        />
      </div>
      <div className={cardSmall__body}>
        <div className={cardSmall__info}>
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
        <button className={`${button} ${cardSmall__button}`}>S'abonner</button>
      </div>
    </div>
  );
}
