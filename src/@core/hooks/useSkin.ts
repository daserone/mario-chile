import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//State
import { handleSkin } from "@store/slice/layout.slice";
import { AppStore } from "@store/store";

interface ClassNames {
  [key: string]: string;
}
export const useSkin = () => {
  const dispatch = useDispatch();
  const store = useSelector((store: AppStore) => store.layoutSlice);

  const setSkin = (type: string) => {
    dispatch(handleSkin(type));
  };

  useEffect(() => {
    // ** Get Body Tag
    const element = window.document.body;
    // ** Define classnames for skins
    const classNames: ClassNames = {
      dark: "dark-layout",
      bordered: "bordered-layout",
      "semi-dark": "semi-dark-layout",
    };
    // ** Remove all classes from Body on mount
    element.classList.remove(...element.classList);
    // ** If skin is not light add skin class
    if (store.skin !== "light") {
      const key = classNames[store.skin] ?? "dark-layout";
      element.classList.add(key);
    }
  }, [store.skin]);

  return { skin: store.skin, setSkin };
};
