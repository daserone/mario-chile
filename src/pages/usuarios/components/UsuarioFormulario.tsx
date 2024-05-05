import { useEffect, useState } from "react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Offcanvas, Spinner } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
//Model
import { User, ResponseNotificacion, Company, Role } from "@src/models";
//Service
import { createUser, getRoles } from "@services/usuario.service";
import useCompanies from "@src/hooks/useCompanies";
import Select from "react-select";

// {
//   "email": "string",
//   "full_name": "string",
//   "password": "string",
//   "company_name": "string",
//   "role": "string"
// }
interface FormValues extends User {
  email: string;
  full_name: string;
  password: string;
  password_confirmation: string;
  company_name: any[];
  role: any[];
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
    control,
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
  const onSubmit = (value: FormValues) => {
    const companyRoles = createCompanyRolesDictionary(
      value.company_name.map((e: any) => e.value),
      value.role.map((e: any) => e.value)
    );
    console.log(companyRoles);
    let body = {
      email: value.email,
      full_name: value.full_name,
      password: value.password,
      company_roles: companyRoles,
    };

    console.log(body);

    usuarioMutation.mutate(value, {
      onSuccess: (rsp) => {
        const { data, status } = rsp;
        if (status >= 200 && status < 300) {
          const { responseCode, message }: ResponseNotificacion = data;
          if (responseCode === 1) {
            toast.success(message);
            handleCloseAndReset();
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

  const createCompanyRolesDictionary = (companies: any[], roles: any[]) => {
    let companyRoles: any = {};

    companies.forEach((company) => {
      companyRoles[company] = roles;
    });

    return companyRoles;
  };

  useEffect(() => {
    if (Object.values(selection ?? {}).length > 0) {
    }
  }, [selection, setValue]);

  const [roles, setRoles] = useState<any[]>([]);

  const { companies } = useCompanies();

  const fetchRoles = () => {
    getRoles()
      .then((data) => {
        console.log(data);
        const options = data.map((role: Role) => {
          return { value: role.name, label: role.name };
        });
        setRoles(options);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const [companiesOptions, setCompaniesOptions] = useState<any[]>([]);

  const setOptionsCompany = () => {
    const options = companies.map((company: Company) => {
      return { value: company.name, label: company.description };
    });
    setCompaniesOptions(options);
  };

  useEffect(() => {
    if (companies.length > 0) setOptionsCompany();
  }, [companies]);

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
            {/* email input */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese el email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <Form.Text className="text-danger">
                  Este campo es requerido
                </Form.Text>
              )}
            </Form.Group>
            {/* nombre input */}
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                {...register("full_name", { required: true })}
              />
              {errors.full_name && (
                <Form.Text className="text-danger">
                  Este campo es requerido
                </Form.Text>
              )}
            </Form.Group>
            {/* password input */}
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese la contraseña"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <Form.Text className="text-danger">
                  Este campo es requerido
                </Form.Text>
              )}
            </Form.Group>
            {/* confirmar password input */}
            <Form.Group className="mb-3">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirme la contraseña"
                {...register("password_confirmation", { required: true })}
              />
              {errors.password_confirmation && (
                <Form.Text className="text-danger">
                  Este campo es requerido
                </Form.Text>
              )}
            </Form.Group>
            {/* empresa input */}
            <Form.Group className="mb-3">
              <Form.Label>Empresa</Form.Label>
              <Controller
                name="company_name"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={companiesOptions}
                    placeholder="Seleccione una empresa"
                  />
                )}
              />

              {errors.company_name && (
                <Form.Text className="text-danger">
                  Este campo es requerido
                </Form.Text>
              )}
            </Form.Group>
            {/* rol input */}
            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    isMulti
                    {...field}
                    options={roles}
                    placeholder="Seleccione un rol"
                  />
                )}
              />

              {errors.role && (
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
