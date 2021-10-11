import styles from "@/styles/style.module.scss";
import Image from "next/image";

export default function Card() {
  const {
    categorySmallCard,
    container,
    categorySmallCard__img,
    categorySmallCard__body,
  } = styles;
  return (
    <div className={`${categorySmallCard} ${container}`}>
      <div className={categorySmallCard__img}>
        <Image
          src="/images/supermarket.png"
          width={1344}
          height={896}
          objectFit="cover"
        />
      </div>

      <div className={`${categorySmallCard__body}`}>
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
