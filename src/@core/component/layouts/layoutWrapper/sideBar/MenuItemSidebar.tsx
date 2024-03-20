import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { is } from "date-fns/locale";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

interface Props {
  menuCollapsed: boolean;
  menuHover: boolean;
  icon: string;
  text: string;
  url: string;
  isFontAwesome?: boolean;
  faIcon?: IconProp;
}
const MenuItemSidebar = ({
  menuCollapsed,
  menuHover,
  icon,
  text,
  url,
  isFontAwesome,
  faIcon,
}: Props) => {
  return (
    <MenuItem className="" component={<Link to={url} />}>
      {isFontAwesome ? (
        <FontAwesomeIcon icon={faIcon!} />
      ) : (
        <img src={icon} alt="" height={20} width={20} />
      )}
      {(menuHover || !menuCollapsed) && (
        <span
          className="font-medium-1"
          style={{
            marginLeft: "10px",
          }}
        >
          {text}
        </span>
      )}
    </MenuItem>
  );
};

export default MenuItemSidebar;
