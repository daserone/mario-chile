import { useState, useEffect } from "react";
import { Sidebar, Menu } from "react-pro-sidebar";
import classnames from "classnames";
import { Menu as MenuFeather } from "react-feather";
import themeConfig from "@src/config/theme.config";

import layoutGrid from "../../../../../assets/sidebar/layout-grid.svg";
import users from "../../../../../assets/sidebar/users.svg";
import listCheck from "../../../../../assets/sidebar/list-check.svg";
import reportSearch from "../../../../../assets/sidebar/report-search.svg";
import speakerphone from "../../../../../assets/sidebar/speakerphone.svg";
import infographic from "../../../../../assets/sidebar/infographic.svg";
import moneyReport from "../../../../../assets/sidebar/money-report.svg";
import brand from "../../../../../assets/sidebar/brand.svg";
import shape from "../../../../../assets/sidebar/shape.svg";

import MenuItemSidebar from "./MenuItemSidebar";

interface Props {
  skin: string;
  menuVisibility?: boolean;
  setMenuVisibility?: any;
  menuCollapsed: boolean;
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
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setMenuHover(false)}
      >
        <Sidebar>
          <Menu>
            <div className="d-flex justify-content-between p-2">
              {menuCollapsed ? (
                <img
                  src={themeConfig.app.appLogoCollapsed}
                  alt="logo"
                  style={{ height: "35px" }}
                />
              ) : (
                <img src={themeConfig.app.appName} alt="logo" />
              )}
              <MenuFeather
                onClick={() => setMenuCollapsed(!menuCollapsed)}
                className="ficon"
                size={20}
              />
            </div>
            {/* usuarios  */}
            <MenuItemSidebar
              icon={layoutGrid}
              menuCollapsed={menuCollapsed}
              menuHover={menuHover}
              text="Usuarios"
            />
            {/* biniwallet  */}
            <span
              className={` menu-title-divider ${
                menuHover || !menuCollapsed ? "margin-small-2" : "margin-small"
              } `}
            >
              BieniWallet
            </span>
            {/* pacientes  */}
            <MenuItemSidebar
              icon={users}
              menuCollapsed={menuCollapsed}
              menuHover={menuHover}
              text="Pacientes"
            />
            {/* validacion  */}
            <MenuItemSidebar
              icon={listCheck}
              menuCollapsed={menuCollapsed}
              menuHover={menuHover}
              text="Validación"
            />
            {/* afiliados  */}
            <MenuItemSidebar
              icon={reportSearch}
              menuCollapsed={menuCollapsed}
              menuHover={menuHover}
              text="Afiliados"
            />
            {/* difusion  */}
            <MenuItemSidebar
              icon={speakerphone}
              menuCollapsed={menuCollapsed}
              menuHover={menuHover}
              text="Difusión"
            />
            {/* BieniMedico  */}
            <span
              className={` menu-title-divider ${
                menuHover || !menuCollapsed ? "margin-small-2" : "margin-small"
              } `}
            >
              BieniMédico
            </span>
            {/* estadisticas  */}
            <MenuItemSidebar
              icon={infographic}
              menuCollapsed={menuCollapsed}
              menuHover={menuHover}
              text="Estadísticas"
            />
            {/* clientes  */}
            <MenuItemSidebar
              icon={brand}
              menuCollapsed={menuCollapsed}
              menuHover={menuHover}
              text="Clientes"
            />
            {/* planes  */}
            <MenuItemSidebar
              icon={moneyReport}
              menuCollapsed={menuCollapsed}
              menuHover={menuHover}
              text="Planes"
            />
            {/* integraciones  */}
            <MenuItemSidebar
              icon={shape}
              menuCollapsed={menuCollapsed}
              menuHover={menuHover}
              text="Integraciones"
            />
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};

export default WrapperSideBar;
