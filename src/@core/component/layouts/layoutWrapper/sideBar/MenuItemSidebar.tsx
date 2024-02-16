import { MenuItem } from "react-pro-sidebar";
interface Props {
  menuCollapsed: boolean;
  menuHover: boolean;
  icon: string;
  text: string;
}
const MenuItemSidebar = ({ menuCollapsed, menuHover, icon, text }: Props) => {
  return (
    <MenuItem>
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
