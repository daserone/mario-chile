import {
  faCancel,
  faCheck,
  faCheckDouble,
  faEllipsisVertical,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuItem, MenuHeader } from "@szhsin/react-menu";
//Style
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

interface ManageOrderProps {
  handleConfirm?: () => void;
  handleCancel?: () => void;
  handleGuides?: () => void;
  handlePrepared?: () => void;
}

const ManageOrder = ({
  handleConfirm,
  handleCancel,
  handleGuides,
  handlePrepared,
}: ManageOrderProps) => {
  return (
    <div>
      <Menu
        portal
        menuButton={
          <button
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
              fontSize: "1.2rem",
            }}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} className="text-muted" />
          </button>
        }
        transition
      >
        <MenuHeader className="text-muted font-small-1">
          {"Opciones de la orden"}
        </MenuHeader>
        <MenuItem onClick={handleConfirm}>
          <FontAwesomeIcon icon={faCheck} className="text-success me-1" />{" "}
          Confirmar{" "}
        </MenuItem>
        <MenuItem onClick={handleCancel}>
          <FontAwesomeIcon icon={faCancel} className="text-danger me-1" />
          Cancelar
        </MenuItem>
        <MenuItem onClick={handleGuides}>
          <FontAwesomeIcon icon={faTags} className="text-primary me-1" />
          Crear guias
        </MenuItem>
        <MenuItem onClick={handlePrepared}>
          <FontAwesomeIcon icon={faCheckDouble} className="text-info me-1" />
          Preparado
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ManageOrder;
