import RcDrawer from "rc-drawer";
import Logo from "./logo";
import styles from "@/styles/style.module.scss";
export default function Drawer({
  className,
  children,
  closeButton,
  closeButtonStyle,
  drawerHandler,
  toggleHandler,
  open,
  width,
  placement,
  drawerStyle,
  closeBtnStyle,
  ...props
}) {
  const { mobile__logoContainer, mobile__logo } = styles;
  return (
    <>
      <RcDrawer
        open={open}
        onClose={toggleHandler}
        width={width}
        placement={placement}
        handler={false}
        level={null}
        duration={"0.4s"}
        {...props}
      >
        {closeButton && (
          <div className={mobile__logoContainer} onClick={toggleHandler}>
            <Logo className={mobile__logo} />
            {closeButton}
          </div>
        )}
        <div className={drawerStyle}>{children}</div>
      </RcDrawer>
      <div
        className="drawer__handler"
        style={{ display: "inline-block" }}
        onClick={toggleHandler}
      >
        {drawerHandler}
      </div>
    </>
  );
}
