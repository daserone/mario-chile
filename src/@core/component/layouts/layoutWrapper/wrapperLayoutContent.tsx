import { memo } from "react";
import { Outlet } from "react-router-dom";
import classnames from "classnames";
import { useSelector } from "react-redux";
//Styles
import "animate.css/animate.css";
//State
import { AppStore } from "@store/store";
// eslint-disable-next-line react-refresh/only-export-components
const WrapperLayoutContent: React.FC = () => {
  const store = useSelector((store: AppStore) => store.layoutSlice);

  const contentWidth = store.contentWidth;
  const transition = store.routerTransition;

  return (
    <div
      className={classnames("app-content content overflow-hidden", {
        "show-overlay": 0,
      })}
    >
      <div className="content-overlay"></div>
      <div className="header-navbar-shadow" />
      <div
        className={classnames({
          "content-wrapper": "",
          "content-area-wrapper": "",
          "container-xxl p-0": contentWidth === "boxed",
          [`animate__animated animate__${transition}`]:
            transition !== "none" && transition.length,
        })}
      >
        <div className="content-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default memo(WrapperLayoutContent);
