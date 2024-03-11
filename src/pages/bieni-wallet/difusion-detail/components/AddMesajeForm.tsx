import { faAdd, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilesBox from "@src/component/files/FilesBox";
import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useForm } from "react-hook-form";
interface Props {
  state: boolean;
  handleToggle: (params: boolean) => void;
}

type FormValues = {
  title: string;
  state: string;
  date: string;
  time: string;
  method: string;
  //notification method
  section?: string;
  message: string;
  // email method
  email: string;
  subject: string;
  attachment: string;
};

const AddMessageForm: React.FC<Props> = ({ state, handleToggle }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = (data: any) => console.log(data);

  const handleCloseAndReset = () => {
    handleToggle(false);
    reset();
  };

  const getValues = watch("method", "");

  const { ref, ...rest } = register("attachment");

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileClick = () => {
    fileRef.current?.click();
  };

  const checkSelectedMethod = () => {
    if (getValues === "notification") {
      return (
        <>
          <Form.Group controlId="message" className="mb-1">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control
              isInvalid={errors.message ? true : false}
              as="textarea"
              placeholder="Ingrese el mensaje de la notificación..."
              {...register("message", { required: true })}
            />
            {errors.message && (
              <Form.Text className="text-danger">
                Este campo es requerido
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="section">
            <Form.Label>Sección</Form.Label>
            <Form.Select
              isInvalid={errors.section ? true : false}
              {...register("section", { required: true })}
            >
              <option value="inicio">Inicio</option>
              {/* mi salud */}
              <option value="mi-salud">Mi salud</option>
              {/* estudios  */}
              <option value="estudios">Estudios</option>
              {/* afiliados */}
              <option value="afiliados">Afiliados</option>
              {/* perfil */}
              <option value="perfil">Perfil</option>
            </Form.Select>
            <Form.Text>
              Cuando se le da clic a la notificación esta redirecciona a una
              sección de Bieni. seleccione a que sección desea redirigir al
              usuario.
            </Form.Text>
            {errors.section && (
              <Form.Text className="text-danger">
                Este campo es requerido
              </Form.Text>
            )}
          </Form.Group>
        </>
      );
    }
    if (getValues === "email") {
      return (
        <>
          <Form.Group controlId="email" className="mb-1">
            <Form.Label>Texto</Form.Label>
            <Form.Control
              isInvalid={errors.email ? true : false}
              type="text"
              as="textarea"
              placeholder="Texto..."
              {...register("email", { required: true })}
            />
            {errors.email && (
              <Form.Text className="text-danger">
                Este campo es requerido
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="subject" className="mb-1">
            <Form.Label>Asunto</Form.Label>
            <Form.Control
              isInvalid={errors.subject ? true : false}
              type="text"
              placeholder="Asunto..."
              {...register("subject", { required: true })}
            />
            {errors.subject && (
              <Form.Text className="text-danger">
                Este campo es requerido
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="attachment">
            <Form.Label>Adjunto</Form.Label>
            <Form.Control
              isInvalid={errors.attachment ? true : false}
              type="file"
              placeholder="Adjunto..."
              className="d-none"
              {...rest}
              ref={(e: HTMLInputElement) => {
                ref(e);
                fileRef.current = e;
              }}
            />
            <FilesBox label="Suba las imagenes" handleClick={handleFileClick} />
            {errors.attachment && (
              <Form.Text className="text-danger">
                Este campo es requerido
              </Form.Text>
            )}
          </Form.Group>
        </>
      );
    }
  };

  return (
    <>
      <Offcanvas show={state} onHide={handleCloseAndReset} placement="end">
        <Offcanvas.Header>
          <Offcanvas.Title>
            {" "}
            <h2>Crear nuevo mensaje</h2>{" "}
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
                Estado <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select
                isInvalid={errors.state ? true : false}
                aria-label="Default select example"
                {...register("state", { required: true })}
                aria-invalid={errors.state ? "true" : "false"}
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </Form.Select>
              {errors.state && (
                <Form.Text className="text-danger">
                  Este campo es requerido
                </Form.Text>
              )}
            </Form.Group>
            <div className="d-flex flex-row align-items-start justify-content-between">
              <Form.Group controlId="state">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  isInvalid={errors.date ? true : false}
                  type="date"
                  placeholder="Fecha..."
                  {...register("date", { required: true })}
                />
              </Form.Group>
              <Form.Group
                controlId="state"
                style={{
                  width: "35%",
                }}
              >
                <Form.Label>Hora</Form.Label>
                <Form.Control
                  isInvalid={errors.time ? true : false}
                  type="time"
                  placeholder="Hora..."
                  {...register("time", { required: true })}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                style={{
                  marginTop: "25px",
                }}
              >
                <FontAwesomeIcon icon={faAdd} />
              </Button>
            </div>
            <hr />
            <div className="mb-1 d-flex flex-column mt-1">
              <Form.Label>Método</Form.Label>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic checkbox toggle button group"
              >
                <input
                  type="radio"
                  className="btn-check"
                  id="btncheck1"
                  autoComplete="off"
                  value={"notification"}
                  {...register("method", { required: true })}
                />
                <label className="btn btn-outline-primary" htmlFor="btncheck1">
                  Notificación
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  id="btncheck2"
                  autoComplete="off"
                  value={"email"}
                  {...register("method", { required: true })}
                />
                <label className="btn btn-outline-primary" htmlFor="btncheck2">
                  Correo
                </label>
              </div>
              {errors.method && (
                <Form.Text className="text-danger">
                  Este campo es requerido
                </Form.Text>
              )}
            </div>
            {/* if (method === "notification")  */}

            {checkSelectedMethod()}

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

export default AddMessageForm;
