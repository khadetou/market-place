import Logo from "../logo";
import Link from "next/link";
import styles from "@/styles/style.module.scss";
import Scrollbars from "react-custom-scrollbars-2";
import { useState } from "react";
import { Menu, Close } from "../icons";
import { BiChevronDown } from "react-icons/bi";
import Drawer from "../drawer";

export default function MobileDrawer() {
  const {
    header__dropdown,
    header__mainMenu,
    header__mainMenuLinks,
    mobile__handler,
  } = styles;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Drawer
      width="320px"
      drawerHandler={
        <div className={mobile__handler}>
          <Menu />
        </div>
      }
      open={isDrawerOpen}
      toggleHandler={() => setIsDrawerOpen(!isDrawerOpen)}
      closeButton={<Close />}
      drawerStyle="mobile__drawer"
      closeBtnStyle="mobile__close"
    >
      <Scrollbars autoHide>
        <div className="mobile__content">
          <div className="mobile__menu">
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
              </li>
              <li>
                <Link href="/">
                  <a className={header__mainMenuLinks}>Blog</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Scrollbars>
    </Drawer>
  );
}
