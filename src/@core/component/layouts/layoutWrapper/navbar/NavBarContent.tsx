import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
//Component
import { BottonDarkMode } from "../BottonDarkMode";
import { Menu } from "react-feather";
// image clinic
import logoClinic from "@src/assets/images/logo-ejemplo.svg";
import profilePic from "@src/assets/images/profile.png";
import iconNotif from "@src/assets/sidebar/notification.svg";
import iconSearch from "@src/assets/sidebar/search.svg";

interface Props {
  setMenuVisibility: (params: boolean) => void;
  skin: string;
  setSkin: (params: string) => void;
}

const NavBarContent = ({ setMenuVisibility, setSkin, skin }: Props) => {
  const CustomToggle = React.forwardRef(
    (
      {
        children,
        onClick,
      }: {
        children: React.ReactNode;
        onClick: React.MouseEventHandler<HTMLImageElement>;
      },
      ref
    ) => (
      <img
        src={profilePic}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      />
    )
  );
  return (
    <>
      {" "}
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" className="" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-1 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              className="nav-menu-main menu-toggle is-active d-xl-none"
              onClick={() => setMenuVisibility(true)}
            >
              <Menu className="ficon" />
            </Nav.Link>
            <div className="clinic">
              <img src={logoClinic} alt="" />
              <span className="font-medium-2">Clínica el sol</span>
              <FontAwesomeIcon icon={faChevronDown} size="lg" />
            </div>
          </Nav>
          <BottonDarkMode skin={skin} setSkin={setSkin} />
          <div className="user-items">
            {/* icon notification  */}
            <img
              src={iconNotif}
              alt="icon-notifications"
              height={25}
              width={25}
            />
            {/* icon search */}
            <img src={iconSearch} alt="icon-search" height={25} width={25} />
            <Dropdown drop="start">
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              />
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </>
  );
};

export default NavBarContent;
