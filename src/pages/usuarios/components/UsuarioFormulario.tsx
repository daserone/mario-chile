import Offcanvas from "react-bootstrap/Offcanvas";
interface Props {
  state: boolean;
  handleToggle: (params: boolean) => void;
}

const UsuarioFormulario: React.FC<Props> = ({ state, handleToggle }) => {
  return (
    <>
      <Offcanvas show={state} onHide={handleToggle}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Crear</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default UsuarioFormulario;
