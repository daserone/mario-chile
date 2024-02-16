import { useDispatch, useSelector } from "react-redux";
//State
import { handleRouterTransition } from "@store/slice/layout.slice";
import { AppStore } from "@store/store";

export const useRouterTransition = () => {
  const dispatch = useDispatch();
  const store = useSelector((store: AppStore) => store.layoutSlice);

  const setTransition = (type: string) => {
    dispatch(handleRouterTransition(type));
  };

  return { transition: store.routerTransition, setTransition };
};
