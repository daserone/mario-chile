//Template config options
import appName from "@assets/images/logo/logo-name.png";
import appNameWhite from "@assets/images/logo/logo-name-white.png";
import appLogo from "@assets/images/logo/logo.png";
import appLogoWhite from "@assets/images/logo/logo-white.png";

import { AppThemeConfig } from "@src/models";

const themeConfig: AppThemeConfig = {
  app: {
    appName: appName,
    appNameWhite: appNameWhite,
    appLogo: appLogo,
    appLogoWhite: appLogoWhite,
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
