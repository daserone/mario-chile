import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, MenuItem, MenuHeader } from "@szhsin/react-menu";
//Style
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

interface AddDocumentsProps {
  handleAdd?: () => void;
}

const AddDocuments = ({ handleAdd }: AddDocumentsProps) => {
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
          {"Opciones de registro"}
        </MenuHeader>
        <MenuItem
          onClick={() => {
            if (handleAdd) {
              handleAdd();
            }
          }}
        >
          <div>{"Subir documentos"}</div>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AddDocuments;
