import { useDispatch, useSelector } from "react-redux";
//State
import { handleNavbarType } from "@store/slice/layout.slice";
import { AppStore } from "@store/store";

export const useNavbarType = () => {
  const dispatch = useDispatch();
  const store = useSelector((store: AppStore) => store.layoutSlice);

  const setNavbarType = (type: string) => {
    dispatch(handleNavbarType(type));
  };

  return { navbarType: store.navbarType, setNavbarType };
};
