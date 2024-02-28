import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import exportIcon from "@src/assets/icons/share-screen.svg";
import { Dropdown } from "react-bootstrap";
import React from "react";
/*
interface ExportButtonProps {
  title?: string;
  handleClick?: () => void;
}
*/
const CustomToggle = React.forwardRef(
  ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }) => (
    //ref
    <button
      className="btn btn-secondary  border-0"
      type="button"
      onClick={onClick}
    >
      <div className="d-flex flex-row justify-content-between text-dark">
        <div className="first-items">
          <img
            src={exportIcon}
            alt=""
            width={15}
            height={15}
            className="me-1"
          />
          Exportar
        </div>
        <FontAwesomeIcon icon={faChevronDown} className="ms-1" />
      </div>
      {children}
    </button>
  )
);

const ExportButton = () => {
  return (
    <Dropdown className="">
      <Dropdown.Toggle as={CustomToggle} />

      <Dropdown.Menu>
        <Dropdown.Header className="text-muted font-small-1 ">
          Opciones de exportación{" "}
        </Dropdown.Header>

        <Dropdown.Item href="#/action-1">PDF</Dropdown.Item>
        <Dropdown.Item href="#/action-2">CSV</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ExportButton;
