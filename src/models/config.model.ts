export interface AppLayout {
  isRTL: boolean;
  skin: "light" | "dark" | "bordered" | "semi-dark";
  routerTransition: "fadeIn" | "fadeInLeft" | "zoomIn" | "none";
  type: "vertical" | "horizontal";
  contentWidth: "full" | "boxed";
  menu: {
    isHidden: boolean;
    isCollapsed: boolean;
  };
  navbar: {
    type: "sticky" | "static" | "floating" | "hidden";
    backgroundColor: string; // Color options could be more complex, use string for now
  };
  footer: {
    type: "static" | "sticky" | "hidden";
  };
  customizer: boolean;
  scrollTop: boolean;
  toastPosition: "top-right" | "top-left" | "bottom-right" | "bottom-left"; // Choose suitable options
}

export interface AppThemeConfig {
  app: {
    appName: string;
    appLogoImage: string; // URL of the image
    appLogoCollapsed: string; // URL of the image
  };
  layout: AppLayout;
}

export interface ContentWidth {
  contentWidth: string;
  // Otros campos que pueda tener el objeto contentWidth
}

export interface LayoutSlice {
  skin: string;
  isRTL: string;
  layout: string;
  lastLayout: string;
  menuCollapsed: boolean;
  footerType: string;
  navbarType: string;
  menuHidden: boolean;
  contentWidth: string;
  routerTransition: string;
  navbarColor: string;
}

/*
  const navbarStore = store?.navbar??"";
  const layoutStored = store.layout.layout;
  const contentWidth = store.layout.contentWidth;
  const transition = store.layout.routerTransition;
*/
