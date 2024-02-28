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
import { HelpCircle, Info, LogOut, Settings, User } from "react-feather";
import { Avatar } from "../Avatar";
import { useSelector } from "react-redux";
import { AppStore } from "@src/state/store";
import useAuth from "@src/@core/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface Props {
  setMenuVisibility: (params: boolean) => void;
  skin: string;
  setSkin: (params: string) => void;
}

const NavBarContent = ({ setMenuVisibility, setSkin, skin }: Props) => {
  const user = useSelector((state: AppStore) => state.auth);

  const { logout } = useAuth();

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
      <Avatar
        img={profilePic}
        imgHeight="40"
        imgWidth="40"
        status={user?.active ? "online" : "offline"}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      />
    )
  );

  const history = useNavigate();

  const handleLogout = () => {
    logout();
    history("/login", { replace: true });
  };
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
                <div
                  style={{
                    width: "100%",
                    paddingBlock: "0.5rem",
                    paddingInline: "1rem",
                  }}
                  className="border-bottom"
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div className="me-1">
                      <Avatar
                        img={profilePic ?? ""}
                        imgHeight="40"
                        imgWidth="40"
                        status={user?.active ? "online" : "offline"}
                      />
                    </div>
                    <div>
                      <span className="align-middle">{user?.name ?? ""}</span>
                      {/* <div className="mt-1 mb-1">{user?.niveldescripcion}</div> */}
                    </div>
                  </div>
                </div>
                <Dropdown.Item
                  onClick={() => {
                    // handleLink(user.id);
                  }}
                  style={{ width: "100%" }}
                >
                  <User size={14} className="me-75" />
                  <span className="align-middle">Mi Perfil</span>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    // history(`/configuracion`, { state: { id: user.id } });
                  }}
                  style={{ width: "100%" }}
                  className="border-bottom"
                >
                  <Settings size={14} className="me-75" />
                  <span className="align-middle">Configuración</span>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    // history(`/ayuda`);
                  }}
                  style={{ width: "100%" }}
                >
                  <HelpCircle size={14} className="me-75" />
                  <span className="align-middle">Ayuda</span>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    // history(`/faq`);
                  }}
                  style={{ width: "100%" }}
                  className="border-bottom"
                >
                  <Info size={14} className="me-75" />
                  <span className="align-middle">FAQ</span>
                </Dropdown.Item>
                <Dropdown.Item style={{ width: "100%" }} onClick={handleLogout}>
                  <LogOut size={14} className="me-75" />
                  <span className="align-middle">Cerrar sesión</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </>
  );
};

export default NavBarContent;
