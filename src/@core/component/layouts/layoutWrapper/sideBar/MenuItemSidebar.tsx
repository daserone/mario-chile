import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

interface Props {
  menuCollapsed: boolean;
  menuHover: boolean;
  icon: string;
  text: string;
  url: string;
}
const MenuItemSidebar = ({
  menuCollapsed,
  menuHover,
  icon,
  text,
  url,
}: Props) => {
  return (
    <MenuItem component={<Link to={url} />}>
      <img src={icon} alt="" height={20} width={20} />
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
