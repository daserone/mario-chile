import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useForm } from "react-hook-form";
import { User } from "@src/models";

interface FormValues extends User {
  name: string;
  email: string;
  status: string;
}

interface Props {
  state: boolean;
  handleToggle: (params: boolean) => void;
}

const UsuarioFormulario: React.FC<Props> = ({ state, handleToggle }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => console.log(data);

  const handleCloseAndReset = () => {
    handleToggle(false);
    reset();
  };

  return (
    <>
      <Offcanvas show={state} onHide={handleCloseAndReset} placement="end">
        <Offcanvas.Header>
          <Offcanvas.Title>
            {" "}
            <h2>Agregar usuario</h2>{" "}
          </Offcanvas.Title>
          <div className="btn-close" onClick={handleCloseAndReset}>
            <FontAwesomeIcon icon={faClose} />
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="position-relative h-100"
          >
            <Form.Group className="mb-1" controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                isInvalid={errors.name ? true : false}
                type="text"
                placeholder="Nombre del usuario..."
                {...register("name", { required: true, maxLength: 100 })}
              />
              {errors.name && (
                <Form.Text className="text-danger">
                  Este campo es requerido
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-1" controlId="email">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                isInvalid={errors.email ? true : false}
                type="email"
                placeholder="Correo del usuario..."
                {...register("email", { required: true })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <Form.Text className="text-danger">
                  Este campo es requerido
                </Form.Text>
              )}
            </Form.Group>

            {/*state select  */}
            <Form.Group className="mb-1" controlId="state">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                isInvalid={errors.status ? true : false}
                aria-label="Default select example"
                {...register("status", { required: true })}
                aria-invalid={errors.status ? "true" : "false"}
              >
                <option value="">Seleccionar...</option>
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </Form.Select>
              {errors.status && (
                <Form.Text className="text-danger">
                  Este campo es requerido
                </Form.Text>
              )}
            </Form.Group>

            {/* cancelar y agregar buttons  row */}
            <div
              className="d-flex justify-content-end gap-10"
              style={{ position: "absolute", bottom: "30px", width: "100%" }}
            >
              <Button
                variant="secondary"
                className="border-0 me-1"
                onClick={handleCloseAndReset}
              >
                <span className="text-dark">Cancelar</span>
              </Button>
              <Button variant="primary" type="submit">
                Agregar usuario
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default UsuarioFormulario;
