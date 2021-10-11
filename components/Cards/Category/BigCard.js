import styles from "@/styles/style.module.scss";
import Image from "next/image";

export default function Card() {
  const {
    categoryCard,
    container,
    categoryCard__img,
    categoryCard__body,
    categoryCard__back,
  } = styles;

  return (
    <div className={`${categoryCard} ${container}`}>
      <div className={categoryCard__img}>
        <Image
          src="/images/supermarket.png"
          width={1344}
          height={896}
          objectFit="cover"
        />
      </div>

      <div className={`${categoryCard__body} ${categoryCard__back}`}>
        <h1>Supermarket</h1>

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
          quasi reiciendis eaque minus perferendis amet nesciunt, nulla,
          blanditiis vitae unde id laudantium voluptatibus, accusantium nisi!
        </p>
      </div>
    </div>
  );
}
