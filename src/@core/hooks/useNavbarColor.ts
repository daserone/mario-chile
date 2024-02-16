import { useDispatch, useSelector } from "react-redux";
//State
import { handleNavbarColor } from "@store/slice/layout.slice";
import { AppStore } from "@store/store";

export const useNavbarColor = () => {
  const dispatch = useDispatch();
  const store = useSelector((store: AppStore) => store.layoutSlice);

  const setNavbarColor = (value: string) => {
    dispatch(handleNavbarColor(value));
  };

  return { navbarColor: store.navbarColor, setNavbarColor };
};
