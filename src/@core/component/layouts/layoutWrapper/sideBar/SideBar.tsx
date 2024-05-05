import { useState, useEffect } from "react";
import { Sidebar, Menu } from "react-pro-sidebar";
import classnames from "classnames";
import { Menu as MenuFeather } from "react-feather";
import themeConfig from "@src/config/theme.config";
import layoutGrid from "../../../../../assets/sidebar/layout-grid.svg";
import users from "../../../../../assets/sidebar/users.svg";

import MenuItemSidebar from "./MenuItemSidebar";
import {
  faChartBar,
  faChartLine,
  faList,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  skin: string;
  menuVisibility?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMenuVisibility?: any;
  menuCollapsed: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMenuCollapsed?: any;
}

const WrapperSideBar = ({ menuCollapsed, skin, setMenuCollapsed }: Props) => {
  //States
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [menuHover, setMenuHover] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  const onMouseEnter = () => {
    setMenuHover(true);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div
        className={classnames(
          "main-menu menu-fixed menu-accordion menu-shadow",
          {
            expanded: menuHover || menuCollapsed === false,
            "menu-light": skin !== "semi-dark" && skin !== "dark",
            "menu-dark": skin === "semi-dark" || skin === "dark",
          }
        )}
        style={{ zIndex: 1000 }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setMenuHover(false)}
      >
        <Sidebar
          backgroundColor={skin === "dark" ? "#283046" : "white"}
          className={classnames(
            "main-menu menu-fixed menu-accordion menu-shadow",
            {
              expanded: menuHover || menuCollapsed === false,
              "menu-light": skin !== "semi-dark" && skin !== "dark",
              "menu-dark": skin === "semi-dark" || skin === "dark",
            }
          )}
          style={{ zIndex: 1000 }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={() => setMenuHover(false)}
        >
          <Menu>
            <div className="d-flex justify-content-between py-2 px-1">
              {menuCollapsed ? (
                <img
                  src={
                    skin === "dark"
                      ? themeConfig.app.appLogoWhite
                      : themeConfig.app.appLogo
                  }
                  alt="logo"
                  style={{ height: "40px", width: "40px", objectFit: "cover" }}
                />
              ) : (
                <img
                  src={
                    skin === "dark"
                      ? themeConfig.app.appNameWhite
                      : themeConfig.app.appName
                  }
                  alt="logo"
                  style={{ height: "40px", width: "100px", objectFit: "cover" }}
                />
              )}
              <MenuFeather
                onClick={() => setMenuCollapsed(!menuCollapsed)}
                className="ficon"
                size={20}
              />
            </div>
            {/* home  */}
            <MenuItemSidebar
              icon={""}
              menuCollapsed={menuCollapsed}
              menuHover={menuHover}
              text="Inicio"
              url="home"
              isFontAwesome
              faIcon={faChartLine}
            />

            {/* usuarios  */}
            <MenuItemSidebar
              icon={""}
              menuCollapsed={menuCollapsed}
              menuHover={menuHover}
              text="Usuarios"
              url="usuarios"
              isFontAwesome
              faIcon={faUsers}
            />
            <span
              className={` menu-title-divider ${
                menuHover || !menuCollapsed ? "margin-small-2" : "margin-small"
              }
                ${skin === "dark" ? "text-light" : "text-muted"}
              
              `}
            >
              Mis Pedidos
            </span>
            <MenuItemSidebar
              icon={layoutGrid}
              menuCollapsed={menuCollapsed}
              menuHover={menuHover}
              text="Mis Pedidos"
              url="orders"
              isFontAwesome
              faIcon={faList}
            />
            <span
              className={` menu-title-divider ${
                menuHover || !menuCollapsed ? "margin-small-2" : "margin-small"
              }
                ${skin === "dark" ? "text-light" : "text-muted"}
              
              `}
            >
              Mis Productos
            </span>
            <MenuItemSidebar
              icon={layoutGrid}
              menuCollapsed={menuCollapsed}
              menuHover={menuHover}
              text="Mis Productos"
              url="products"
              isFontAwesome
              faIcon={faList}
            />
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};

export default WrapperSideBar;
