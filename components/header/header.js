import Logo from "../logo";
import Link from "next/link";
import styles from "@/styles/style.module.scss";
import { Search, Cart, Store, User } from "../icons";
import { BiChevronDown } from "react-icons/bi";
import Dropdown from "./dropdown";
import MobileDrawer from "./mobile-drawer";

export default function Header() {
  const {
    header,
    container,
    header__second,
    header__menuTitle,
    header__topHeader,
    header__devided,
    header__midHeader,
    header__menu,
    header__icons,
    header__search,
    header__bottom,
    header__mainMenu,
    header__dropdown,
    header__mainMenuLinks,
  } = styles;

  const menues = [
    {
      icon: <Store />,
      path: "/",
      title: "Ouvrire une Shop",
    },
    {
      icon: <User />,
      path: "/users/login",
      title: "Se Connecter",
    },
    {
      icon: <Cart />,
      path: "/",
      title: "Panier",
    },
  ];

  return (
    <div className={header}>
      <div className={header__second}>
        <div className={`${container} ${header__topHeader}`}>
          <ul className={header__devided}>
            <li>+221786004564</li>
            <li>hotcodesacademy@gmail.com</li>
          </ul>
          <ul className={header__devided}>
            <li>CFA</li>
            <li>FRANÇAIS</li>
            <li>
              <Link href="/">
                <a>ORDER TRACKING</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bg main */}
      <div>
        <div className={`${container} ${header__midHeader}`}>
          <Logo />
          <div className={header__search}>
            <input type="text" placeholder="Search .." />
            <Search />
          </div>
          <ul className={header__menu}>
            {menues.map((menu, idx) => (
              <li key={idx}>
                <Link href={menu.path}>
                  <a className={header__icons}>
                    {menu.icon}
                    <span className={header__menuTitle}>{menu.title}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <MobileDrawer />
        </div>
      </div>
      {/* End bg main */}
      <div className={header__second}>
        <div className={`${header__bottom} ${container}`}>
          <ul className={header__mainMenu}>
            <li>
              <Link href="/">
                <a className={header__mainMenuLinks}>Accueille</a>
              </Link>
            </li>
            <li className={header__dropdown}>
              <Link href="/">
                <a className={header__mainMenuLinks}>
                  Categories <BiChevronDown />
                </a>
              </Link>
              <Dropdown />
            </li>
            <li>
              <Link href="/">
                <a className={header__mainMenuLinks}>Blog</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
