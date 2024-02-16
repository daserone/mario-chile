import { useEffect, useState, createContext, ReactNode } from "react";

interface props {
  children: ReactNode;
}

interface ThemeColor {
  light: string;
  main: string;
}

interface ThemeColorsType {
  primary: ThemeColor;
  secondary: ThemeColor;
  success: ThemeColor;
  danger: ThemeColor;
  warning: ThemeColor;
  info: ThemeColor;
  dark: ThemeColor;
}

const ThemeColors = createContext<ThemeColorsType | undefined>(undefined);

const ThemeContext = ({ children }: props) => {
  const [colors, setColors] = useState<ThemeColorsType | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getHex = (color: string) =>
        window.getComputedStyle(document.body).getPropertyValue(color).trim();
      //Colors obj
      const obj = {
        primary: {
          light: getHex("--bs-primary").concat("1a"),
          main: getHex("--bs-primary"),
        },
        secondary: {
          light: getHex("--bs-secondary").concat("1a"),
          main: getHex("--bs-secondary"),
        },
        success: {
          light: getHex("--bs-success").concat("1a"),
          main: getHex("--bs-success"),
        },
        danger: {
          light: getHex("--bs-danger").concat("1a"),
          main: getHex("--bs-danger"),
        },
        warning: {
          light: getHex("--bs-warning").concat("1a"),
          main: getHex("--bs-warning"),
        },
        info: {
          light: getHex("--bs-info").concat("1a"),
          main: getHex("--bs-info"),
        },
        dark: {
          light: getHex("--bs-dark").concat("1a"),
          main: getHex("--bs-dark"),
        },
      };

      setColors({ ...obj });
    }
  }, []);

  return (
    <ThemeColors.Provider value={colors as ThemeColorsType}>
      {children}
    </ThemeColors.Provider>
  );
};

export { ThemeColors, ThemeContext };
