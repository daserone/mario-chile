//Template config options
import appName from "../assets/images/logo/bieni.svg";
import appLogoImage from "../assets/images/logo/logo2.svg";
import appLogoCollapsed from "../assets/images/logo/bieni-icon.svg";
import { AppThemeConfig } from "@src/models";

const themeConfig: AppThemeConfig = {
  app: {
    appName: appName,
    appLogoImage: appLogoImage,
    appLogoCollapsed: appLogoCollapsed,
  },
  layout: {
    isRTL: false,
    skin: "light",
    routerTransition: "fadeIn",
    type: "vertical",
    contentWidth: "full",
    menu: {
      isHidden: false,
      isCollapsed: true,
    },
    navbar: {
      type: "sticky",
      backgroundColor: "white",
    },
    footer: {
      type: "static",
    },
    customizer: false,
    scrollTop: true,
    toastPosition: "top-right",
  },
};

export default themeConfig;
