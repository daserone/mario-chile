import { useDispatch, useSelector } from "react-redux";
//State
import { handleLayout, handleLastLayout } from "@store/slice/layout.slice";
import { AppStore } from "@store/store";

export const useLayout = () => {
  const dispatch = useDispatch();
  const store = useSelector((store: AppStore) => store.layoutSlice);

  const setLayout = (value: string) => {
    dispatch(handleLayout(value));
  };

  const setLastLayout = (value: string) => {
    dispatch(handleLastLayout(value));
  };

  if (window) {
    const breakpoint = 1200;

    if (window.innerWidth < breakpoint) {
      setLayout("vertical");
    }

    window.addEventListener("resize", () => {
      if (
        window.innerWidth <= breakpoint &&
        store.lastLayout !== "vertical" &&
        store.layout !== "vertical"
      ) {
        setLayout("vertical");
      }
      if (
        window.innerWidth >= breakpoint &&
        store.lastLayout !== store.layout
      ) {
        setLayout(store.lastLayout);
      }
    });
  }

  return {
    layout: store.layout,
    setLayout,
    lastLayout: store.lastLayout,
    setLastLayout,
  };
};
