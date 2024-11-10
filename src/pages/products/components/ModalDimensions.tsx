import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ModalDimensionsProps {
  isOpen: boolean;
  handleClose: () => void;
  saveDimensions: (form: FormValues) => void;
}

interface FormValues {
  height: number;
  width: number;
  length: number;
  weight: number;
  depth: number;
}

function ModalDimensions({
  isOpen,
  handleClose,
  saveDimensions,
}: ModalDimensionsProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (form: FormValues) => {
    saveDimensions(form);
    reset();
    handleClose();
  };

  return (
    <>
      <Offcanvas show={isOpen} onHide={handleClose} placement="end">
        <Offcanvas.Header>
          <Offcanvas.Title>Dimensiones</Offcanvas.Title>
          <div className="btn-close" onClick={handleClose}>
            <FontAwesomeIcon icon={faClose} />
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column">
            <div className="col-12">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="height">
                  <Form.Label>Alto (cm) </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Alto"
                    {...register("height", { required: true })}
                  />
                  {errors.height && (
                    <Form.Text className="text-danger">
                      Este campo es requerido
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="width">
                  <Form.Label>Ancho (cm)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ancho"
                    {...register("width", { required: true })}
                  />
                  {errors.width && (
                    <Form.Text className="text-danger">
                      Este campo es requerido
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="length">
                  <Form.Label>Largo (cm)</Form.Label>

                  <Form.Control
                    type="number"
                    placeholder="Largo"
                    {...register("length", { required: true })}
                  />
                  {errors.length && (
                    <Form.Text className="text-danger">
                      Este campo es requerido
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="depth">
                  <Form.Label>Profundidad (cm)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Profundidad"
                    {...register("depth", { required: true })}
                  />
                  {errors.depth && (
                    <Form.Text className="text-danger">
                      Este campo es requerido
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="weight">
                  <Form.Label>Peso (kg)</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Peso"
                    {...register("weight", { required: true })}
                  />
                  {errors.weight && (
                    <Form.Text className="text-danger">
                      Este campo es requerido
                    </Form.Text>
                  )}
                </Form.Group>
                <Button variant="primary" type="submit">
                  Guardar
                </Button>
              </Form>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ModalDimensions;
