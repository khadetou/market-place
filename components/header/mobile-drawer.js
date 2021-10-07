import Link from "next/link";
import styles from "@/styles/style.module.scss";
import Scrollbars from "react-custom-scrollbars-2";
import { useState } from "react";
import { Menu, Close, Home } from "../icons";
import { BiChevronRight } from "react-icons/bi";
import Drawer from "../drawer";

export default function MobileDrawer() {
  const {
    mobile__category,
    header__mainMenuLinks,
    mobile__drawer,
    mobile__handler,
    mobile__content,
    mobile__menu,
    mobile__home,
  } = styles;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const array = ["el", "el1", "el2", "el3"];
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
      drawerStyle={mobile__drawer}
      closeBtnStyle="mobile__close"
    >
      <Scrollbars autoHide>
        <div className={mobile__content}>
          <div className={mobile__menu}>
            <Link href="/">
              <div className={mobile__home}>
                <h3 className={header__mainMenuLinks}>Accueille</h3>
                <Home />
              </div>
            </Link>
            <div className={mobile__category}>
              <h3 className={header__mainMenuLinks}>Top Category</h3>
              <a className={header__mainMenuLinks}>Electroniques</a>
              <a className={header__mainMenuLinks}>Beauté</a>
              <a className={header__mainMenuLinks}>Super Marché</a>
              <a className={header__mainMenuLinks}>
                Toutes Les Categories <BiChevronRight />
              </a>
            </div>

            <div>
              <Link href="/">
                <h3 className={header__mainMenuLinks}>Blog</h3>
              </Link>
            </div>
          </div>
        </div>
      </Scrollbars>
    </Drawer>
  );
}
