import { useDispatch, useSelector } from "react-redux";
//State
import { handleFooterType } from "@store/slice/layout.slice";
import { AppStore } from "@store/store";

export const useFooterType = () => {
  const dispatch = useDispatch();

  const store = useSelector((store: AppStore) => store.layoutSlice);

  const setFooterType = (type: string) => {
    dispatch(handleFooterType(type));
  };

  return { setFooterType, footerType: store.footerType };
};
