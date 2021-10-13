import styles from "@/styles/style.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Marketing() {
  const { marketing, marketing__col1, marketing__col2, button, container } =
    styles;
  return (
    <div className={`${marketing} ${container}`}>
      <div className={marketing__col1}>
        <h3>developez</h3>
        <h1>Votre Business Sur le Marchet</h1>
        <p>
          Vous n’aurez pas a vous soucier du marketing de votre produit, ceci
          geré par le platform votre produit sera connu partout au niveau
          national.
        </p>
        <Link href="/">
          <a className={button}>En Savoir plus</a>
        </Link>
      </div>
      <div className={marketing__col2}>
        <Image src="/images/objectif.svg" width={781} height={697} />
      </div>
    </div>
  );
}
