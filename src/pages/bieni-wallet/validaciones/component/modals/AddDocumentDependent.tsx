import { useEffect } from "react";
import { faClose, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { useForm } from "react-hook-form";
//Model
import FilesBox from "@src/component/files/FilesBox";
import FileItem from "@src/component/files/FileItem";
import { DataRowD } from "@src/models/dependent.model";
//Service
interface FormValues {
  mainName: string;
  documentMain: string;
  dependentName: string;
  documentDependent: string;
}

interface Props {
  state: boolean;
  handleToggle: (params: boolean) => void;
  selection: DataRowD | null;
  setSelection: (params: DataRowD | null) => void;
}

const AddDocumentDependent: React.FC<Props> = ({
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
    const { mainName, documentMain, dependentName, documentDependent } = value;
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
              <Form.Label>Acudiente</Form.Label>
              <Form.Control
                isInvalid={errors.mainName ? true : false}
                type="text"
                placeholder="Nombre del perfil principal..."
                {...register("mainName", { required: true })}
                aria-invalid={errors.mainName ? "true" : "false"}
              />
              {errors.mainName && (
                <Form.Text className="text-danger">
                  Este campo es requerido
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-1" controlId="documentMain">
              <Form.Label>Documento del acudiente</Form.Label>
              <Form.Control
                isInvalid={errors.documentMain ? true : false}
                type="text"
                placeholder="Documento del perfil principal..."
                {...register("documentMain", { required: true })}
                aria-invalid={errors.documentMain ? "true" : "false"}
              />
              {errors.documentMain && (
                <Form.Text className="text-danger">
                  Este campo es requerido
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-1" controlId="name">
              <Form.Label>Dependiente</Form.Label>
              <Form.Control
                isInvalid={errors.dependentName ? true : false}
                type="text"
                placeholder="Nombre del dependiente..."
                {...register("dependentName", { required: true })}
                aria-invalid={errors.dependentName ? "true" : "false"}
              />
              {errors.dependentName && (
                <Form.Text className="text-danger">
                  Este campo es requerido
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-1" controlId="documentDependent">
              <Form.Label>Documento del dependiente</Form.Label>
              <Form.Control
                isInvalid={errors.documentDependent ? true : false}
                type="text"
                placeholder="Documento del dependiente..."
                {...register("documentDependent", { required: true })}
                aria-invalid={errors.documentDependent ? "true" : "false"}
              />
              {errors.documentDependent && (
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

export default AddDocumentDependent;
