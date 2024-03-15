import { useEffect } from "react";
import { faClose, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { useForm } from "react-hook-form";
//Model
import { DataRowPac, DataRowPacientes } from "@src/models/paciente.model";
import FilesBox from "@src/component/files/FilesBox";
import FileItem from "@src/component/files/FileItem";
//Service
interface FormValues {
  name: string;
  email: string;
  document: string;
}

interface Props {
  state: boolean;
  handleToggle: (params: boolean) => void;
  selection: DataRowPac | null;
  setSelection: (params: DataRowPac | null) => void;
}

const AddDocumentPatient: React.FC<Props> = ({
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

  const onSubmit = (value: FormValues) => {
    const { name, email, document } = value;
  };

  useEffect(() => {}, []);

  const files: File[] = [
    new File(["foo"], "foo1.txt", {
      type: "text/plain",
    }),
    new File(["foo"], "foo2.txt", {
      type: "text/plain",
    }),
    new File(["foo"], "foo3.txt", {
      type: "text/plain",
    }),
    new File(["foo"], "foo4.txt", {
      type: "text/plain",
    }),
  ];

  return (
    <>
      <Offcanvas show={state} onHide={handleCloseAndReset} placement="end">
        <Offcanvas.Header>
          <Offcanvas.Title>
            {" "}
            <h2>Subir documentos paciente</h2>{" "}
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
                placeholder="Nombre del paciente..."
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
            <Form.Group className="mb-1" controlId="document">
              <Form.Label>Documento</Form.Label>
              <Form.Control
                isInvalid={errors.document ? true : false}
                type="text"
                placeholder="Documento del paciente..."
                {...register("document", { required: true })}
                aria-invalid={errors.document ? "true" : "false"}
              />
              {errors.document && (
                <Form.Text className="text-danger">
                  Este campo es requerido
                </Form.Text>
              )}
            </Form.Group>
            <FilesBox
              title="Arrastra y suelta tus 
              documentos aquí"
              label="Sube tus documentos para validar la identidad del paciente."
              handleClick={() => {}}
            />
            <div className="my-2">
              {files.map((file) => (
                <FileItem
                  key={file.name}
                  file={file}
                  handleRemove={() => {}}
                  handleExpand={() => {}}
                />
              ))}
            </div>

            {/* cancelar y agregar buttons  row */}
            <div className="d-flex justify-content-end gap-10">
              <Button
                variant="secondary"
                className="border-0 me-1"
                onClick={handleCloseAndReset}
              >
                <span className="text-dark">Cancelar</span>
              </Button>
              <Button variant="success" type="submit">
                <FontAwesomeIcon icon={faThumbsUp} />
                <span className="align-middle ms-2">Aprobar</span>
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AddDocumentPatient;
