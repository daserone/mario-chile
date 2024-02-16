import { Sun, Moon } from "react-feather";
import Nav from "react-bootstrap/Nav";

interface Props {
  skin: string;
  setSkin: (params: string) => void;
}
const BottonDarkMode = ({ skin, setSkin }: Props) => {
  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      <Nav className="d-none d-lg-block">
        <Nav.Link href="#home">
          {skin === "dark" ? (
            <Sun className="ficon" onClick={() => setSkin("light")} />
          ) : (
            <Moon className="ficon" onClick={() => setSkin("dark")} />
          )}
        </Nav.Link>
      </Nav>
    </ul>
  );
};
export default BottonDarkMode;
