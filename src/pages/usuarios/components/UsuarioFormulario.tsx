import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Offcanvas, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
//Model
import { User } from "@src/models";
import { ResponseNotificacion } from "@src/models";
//Service
import { postUsuario } from "@services/usuario.service";
interface FormValues extends User {
  password?: string;
  phone?: string;
  state?: string;
  level?: string | number;
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

  const handleCloseAndReset = () => {
    handleToggle(false);
    reset();
  };

  //Solicitud
  //const queryClient = useQueryClient();
  const usuarioMutation = useMutation({
    mutationFn: postUsuario,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (value: FormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const form: any = new FormData();
    form.append("op", "usuario");
    form.append("email", value.email);
    form.append("lastName", value.lastName);
    form.append("name", value.name);
    form.append("password", value.password);
    form.append("phone", value.phone);
    form.append("state", value.state);
    usuarioMutation.mutate(form, {
      onSuccess: (rsp) => {
        const { data, status } = rsp;
        if (status >= 200 && status < 300) {
          const { responseCode, message }: ResponseNotificacion = data;
          if (responseCode === 1) {
            toast.success(message);
          } else if (responseCode === 2) {
            toast.error(message);
          }
        }
      },
      onError: () => {
        toast.error("Error en el servidor.");
      },
    });
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
            <Form.Group className="mb-1" controlId="name">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                isInvalid={errors.lastName ? true : false}
                type="text"
                placeholder="Apellido del usuario..."
                {...register("lastName", { required: true, maxLength: 100 })}
              />
              {errors.lastName && (
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
            <Form.Group className="mb-1" controlId="email">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                isInvalid={errors.phone ? true : false}
                type="text"
                placeholder="teléfono del usuario..."
                {...register("phone", { required: true })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <Form.Text className="text-danger">
                  Este campo es requerido
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-1" controlId="email">
              <Form.Label>Clave</Form.Label>
              <Form.Control
                isInvalid={errors.password ? true : false}
                type="text"
                placeholder="clave del usuario..."
                {...register("password", { required: true })}
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
                isInvalid={errors.state ? true : false}
                aria-label="Default select example"
                {...register("state", { required: true })}
                aria-invalid={errors.state ? "true" : "false"}
              >
                <option value="">Seleccionar...</option>
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </Form.Select>
              {errors.state && (
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
                {usuarioMutation.isPending && (
                  <Spinner color="light" size="sm"></Spinner>
                )}
                <span className="align-middle ms-25">Agregar usuario</span>
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default UsuarioFormulario;
