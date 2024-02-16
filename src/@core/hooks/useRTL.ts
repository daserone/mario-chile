import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//State
import { handleRTL } from "@store/slice/layout.slice";
import { AppStore } from "@store/store";

export const useRTL = () => {
  const dispatch = useDispatch();
  const isRtl = useSelector((store: AppStore) => store.layoutSlice.isRTL);

  const setValue = (value: string) => {
    dispatch(handleRTL(value));
  };

  useEffect(() => {
    // ** Get HTML Tag
    const element = document.getElementsByTagName("html")[0];

    // ** If isRTL then add attr dir='rtl' with HTML else attr dir='ltr'
    if (isRtl) {
      element.setAttribute("dir", "rtl");
    } else {
      element.setAttribute("dir", "ltr");
    }
  }, [isRtl]);

  return [isRtl, setValue];
};
