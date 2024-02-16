import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
//Component
import { BottonDarkMode } from "../BottonDarkMode";
import { Menu } from "react-feather";

interface Props {
  setMenuVisibility: (params: boolean) => void;
  skin: string;
  setSkin: (params: string) => void;
}
const NavBarContent = ({ setMenuVisibility, setSkin, skin }: Props) => {
  return (
    <>
      {" "}
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-1 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              className="nav-menu-main menu-toggle hidden-xs is-active"
              onClick={() => setMenuVisibility(true)}
            >
              <Menu className="ficon" />
            </Nav.Link>
          </Nav>
          <BottonDarkMode skin={skin} setSkin={setSkin} />
          <Dropdown as={ButtonGroup}>
            <Button variant="success">Split Button</Button>
            <Dropdown.Toggle
              split
              variant="success"
              id="dropdown-split-basic"
            />
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Container>
    </>
  );
};

export default NavBarContent;
