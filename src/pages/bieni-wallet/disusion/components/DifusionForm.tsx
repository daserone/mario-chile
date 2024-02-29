import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useForm } from "react-hook-form";
interface Props {
  state: boolean;
  handleToggle: (params: boolean) => void;
}

type FormValues = {
  title: string;
  description: string;
  status: string;
  genre: string;
  age: string;
};

const DifusionForm: React.FC<Props> = ({ state, handleToggle }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
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
              <Form.Label>
                Titulo de la difusión <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                isInvalid={errors.title ? true : false}
                type="text"
                placeholder="Titulo de la difusión..."
                {...register("title", { required: true, maxLength: 100 })}
              />
              {errors.title && (
                <Form.Text className="text-danger">
                  Este campo es requerido
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-1" controlId="email">
              <Form.Label>
                Descripción <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                isInvalid={errors.description ? true : false}
                as="textarea"
                rows={3}
                placeholder="Descripción..."
                {...register("description", { required: true })}
                aria-invalid={errors.description ? "true" : "false"}
              />
              {errors.description && (
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
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </Form.Select>
              {errors.status && (
                <Form.Text className="text-danger">
                  Este campo es requerido
                </Form.Text>
              )}
            </Form.Group>
            <hr />
            <span className="font-small-2">
              Seleccione los usuarios que recibirán la difusión.
            </span>
            <Form.Group className="mb-1 mt-1" controlId="state">
              <Form.Label>Genero</Form.Label>
              <Form.Select
                isInvalid={errors.genre ? true : false}
                aria-label="Default select example"
                {...register("genre", { required: true })}
                aria-invalid={errors.genre ? "true" : "false"}
              >
                <option value="">Seleccionar...</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </Form.Select>
              {errors.genre && (
                <Form.Text className="text-danger">
                  Este campo es requerido
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-1" controlId="state">
              <Form.Label>Edad</Form.Label>
              <Form.Select
                isInvalid={errors.age ? true : false}
                aria-label="Default select example"
                {...register("age", { required: true })}
                aria-invalid={errors.age ? "true" : "false"}
              >
                <option value="">Seleccionar...</option>
                <option value="0-18">0-18</option>
                <option value="19-30">19-30</option>
                <option value="31-50">31-50</option>
                <option value="51-70">51-70</option>
                <option value="71-100">71-100</option>
              </Form.Select>
              {errors.age && (
                <Form.Text className="text-danger">
                  Este campo es requerido
                </Form.Text>
              )}
            </Form.Group>
            {/* cancelar y agregar buttons  row */}
            <div
              className="d-flex justify-content-end gap-10 mt-5"
              //   style={{ position: "absolute", bottom: "30px", width: "100%" }}
            >
              <Button
                variant="secondary"
                className="border-0 me-1"
                onClick={handleCloseAndReset}
              >
                <span className="text-dark">Cancelar</span>
              </Button>
              <Button variant="primary" type="submit">
                Aplicar
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default DifusionForm;
