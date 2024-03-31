import { useEffect } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Offcanvas, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
//Model
import { User, ResponseNotificacion } from "@src/models";
//Service
import { createUser } from "@services/usuario.service";
interface FormValues extends User {
  password?: string;
  level?: string | number;
}

interface Props {
  state: boolean;
  handleToggle: (params: boolean) => void;
  selection: User | null;
  setSelection: (params: User | null) => void;
}

const UsuarioFormulario: React.FC<Props> = ({
  state,
  handleToggle,
  selection,
  setSelection,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const handleCloseAndReset = () => {
    handleToggle(false);
    reset();
    setSelection(null);
  };
  //Solicitud
  //const queryClient = useQueryClient();
  const usuarioMutation = useMutation({
    mutationFn: createUser,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (value: FormValues) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const form: any = new FormData();
    form.append("op", "usuario");

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

  useEffect(() => {
    if (Object.values(selection ?? {}).length > 0) {
    }
  }, [selection, setValue]);

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
