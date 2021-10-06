import styles from "@/styles/style.module.scss";
import Link from "next/link";
import categories from "./header-data";
export default function Dropdown() {
  const {
    header__content,
    header__row,
    header__col,
    header__box,
    header__col3,
    header__boxTitle,
    header__categoryList,
    header__sousCatTitle,
  } = styles;

  return (
    <div className={header__content}>
      <div className={header__row}>
        {categories.map((category, idx) => (
          <div key={idx} className={`${header__col} ${header__col3}`}>
            <div className={header__box}>
              <Link href={category.path}>
                <a className={header__boxTitle}>{category.title}</a>
              </Link>
              <h3 className={header__sousCatTitle}>
                {category.sousCate.title}
              </h3>
              <ul className={header__categoryList}>
                {category.sousCate.items.map((el, idx) => (
                  <li key={idx}>
                    <Link href={el.path}>
                      <a>{el.item}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
