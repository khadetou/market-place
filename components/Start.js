import styles from "@/styles/style.module.scss";
import Link from "next/link";
export default function Start() {
  const { start, container, button, start__content } = styles;
  return (
    <div className={`${start} ${container}`}>
      <div className={start__content}>
        <h3>il est temps</h3>
        <h1>De commencer votre business</h1>
        <p>
          Commencez à vendre vos produits gratuitement, explorer toutes les
          outils dont vous aurez besoin afin d’améliorer votre business
        </p>
        <Link href="/">
          <a className={button}>Commencer Maintenant</a>
        </Link>
      </div>
    </div>
  );
}
