import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import Navbar from "react-bootstrap/Navbar";
//Components
import { Footer } from "./footer/Footer";
import { WrapperSideBar } from "./sideBar";
import WrapperLayoutContent from "./wrapperLayoutContent";
import { NavBarContent } from "./navbar";
//Hooks
import { useSkin } from "@core/hooks/useSkin";
import { useNavbarType } from "@core/hooks/useNavbarType";
import { useFooterType } from "@core/hooks/useFooterType";
import { useNavbarColor } from "@core/hooks/useNavbarColor";
//State
import { handleMenuCollapsed } from "@store/slice/layout.slice";
//Styles
import "@styles/base/core/menu/menu-types/vertical-menu.scss";
import "@styles/base/core/menu/menu-types/vertical-overlay-menu.scss";
//Store
import { AppStore } from "@store/store";
//Interface
interface NavbarWrapperClasses {
  [key: string]: string;
}

interface FooterClasses {
  [key: string]: string;
}

interface NavbarClasses {
  [key: string]: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WrapperVerticalLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const layoutStore = useSelector((store: AppStore) => store.layoutSlice);

  const isHidden = layoutStore.menuHidden;
  const menuCollapsed = layoutStore.menuCollapsed;
  const contentWidth = layoutStore.contentWidth;
  //Hook
  const { skin, setSkin } = useSkin();
  const { footerType } = useFooterType();
  const { navbarColor } = useNavbarColor();
  const { navbarType } = useNavbarType();
  //States
  const [isMounted, setIsMounted] = useState(false);
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setMenuCollapsed = (val: any) => dispatch(handleMenuCollapsed(val));
  // Update Window Width
  const handleWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  //This function will detect the Route Change and will hide the menu on menu item click
  useEffect(() => {
    if (menuVisibility && windowWidth < 1200) {
      setMenuVisibility(false);
    }
  }, [location]);
  //Sets Window Size & Layout Props
  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener("resize", handleWindowWidth);
    }
  }, [windowWidth]);
  //ComponentDidMount
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  //Vars
  const footerClasses: FooterClasses = {
    static: "footer-static",
    sticky: "footer-fixed",
    hidden: "footer-hidden",
  };

  const navbarWrapperClasses: NavbarWrapperClasses = {
    floating: "navbar-floating",
    sticky: "navbar-sticky",
    static: "navbar-static",
    hidden: "navbar-hidden",
  };

  const navbarClasses: NavbarClasses = {
    floating:
      contentWidth === "boxed" ? "floating-nav container-xxl" : "floating-nav",
    sticky: "fixed-top",
    static: "navbar-static-top",
    hidden: "d-none",
  };

  const bgColorCondition =
    navbarColor !== "" && navbarColor !== "light" && navbarColor !== "white";

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={classnames(
        `wrapper vertical-layout ${
          navbarWrapperClasses[navbarType] || "navbar-floating"
        } ${footerClasses[footerType] || "footer-static"}`,
        {
          // Modern Menu
          "vertical-menu-modern": windowWidth >= 1200,
          "menu-collapsed": menuCollapsed && windowWidth >= 1200,
          "menu-expanded": !menuCollapsed && windowWidth > 1200,
          // Overlay Menu
          "vertical-overlay-menu": windowWidth < 1200,
          "menu-hide": !menuVisibility && windowWidth < 1200,
          "menu-open": menuVisibility && windowWidth < 1200,
        }
      )}
      {...(isHidden ? { "data-col": "1-column" } : {})}
    >
      {/*SideBar*/}
      {!isHidden ? (
        <WrapperSideBar
          skin={skin}
          menuVisibility={menuVisibility}
          setMenuVisibility={setMenuVisibility}
          menuCollapsed={menuCollapsed}
          setMenuCollapsed={setMenuCollapsed}
        />
      ) : null}
      {/*NavBar*/}
      <Navbar
        expand="lg"
        //container={false}
        //light={skin !== "dark"}
        //dark={skin === "dark" || bgColorCondition}
        color={bgColorCondition ? navbarColor : undefined}
        style={{ margin: "0 27px", position: "absolute" }}
        className={classnames(
          `header-navbar my-1 navbar align-items-center ${
            navbarClasses[navbarType] || "floating-nav"
          } navbar-shadow`
        )}
      >
        <div className="navbar-container d-flex content">
          {/*<NavbarComponent
            setMenuVisibility={setMenuVisibility}
            skin={skin}
            setSkin={setSkin}
        />*/}
          {/*setMenuVisibility, skin, setSkin */}
          <NavBarContent
            setMenuVisibility={setMenuVisibility}
            skin={skin}
            setSkin={setSkin}
          />
        </div>
      </Navbar>
      {/*children*/}
      <WrapperLayoutContent />
      <div
        className={classnames("sidenav-overlay", {
          show: menuVisibility,
        })}
        onClick={() => setMenuVisibility(false)}
      ></div>
      {/*Footer*/}
      <footer
        className={classnames(
          `footer footer-light ${footerClasses[footerType] || "footer-static"}`,
          {
            "d-none": footerType === "hidden",
          }
        )}
      >
        <Footer />
      </footer>
    </div>
  );
};

export default WrapperVerticalLayout;
/*
import { useRouterTransition } from "@core/hooks/useRouterTransition";
import { useRTL } from "@core/hooks/useRTL";
import { useLayout } from "@src/hooks/useLayout";
*/
