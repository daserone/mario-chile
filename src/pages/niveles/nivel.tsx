import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonPage,
  IonToast,
  IonButton,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NavLateral, HeaderInterior } from "../../components";
import { advancedSchema } from "../usuarios/validaciones.js";
import { FieldSelect, FieldText } from "../../components";
import { createNivel, getNivelById, updateNivel } from "../../api/nivelesApi";
import "./niveles.css";
const Nivel: React.FC = () => {
  const { id }: any = useParams();

  const [state, setState] = useState({
    id: "",
    descripcion: "",
    nombre: "",
    estatus: "",
  });
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });

  const initialValues = {
    nombre: state.nombre || "",
    descripcion: state.descripcion || "",
    estatus: state.estatus || "",
  };

  const queryClient = useQueryClient();

  useQuery(["nivel", { id }], (id) => getNivelById(id), {
    onSuccess: (res) => {
      setState(res.data);
    },
  });

  const addNivelMutation = useMutation({
    mutationFn: createNivel,
    onSuccess: (nivel, variables) => {
      variables = { ...variables, id: nivel.data.id };
      if (queryClient.getQueryData(["niveles"])) {
        queryClient.setQueryData(["niveles"], (prevNiveles: any) =>
          prevNiveles.concat(variables)
        );
      }
      setNotificacion({
        msg: "Nivel agregado exitosamente",
        estado: true,
      });
    },
  });

  const updateNivelMutation = useMutation({
    mutationFn: updateNivel,
    onSuccess: () => {
      if (queryClient.getQueryData(["niveles"])) {
        queryClient.invalidateQueries(["niveles"]);
      }
      setNotificacion({
        msg: "Nivel actualizado exitosamente",
        estado: true,
      });
    },
  });

  const nivelAgregar = (
    nivel: any,
    setSubmitting: any,
    resetForm: Function
  ) => {
    addNivelMutation.mutate(nivel, {
      onSuccess: () => {
        resetForm({});
        setSubmitting(false);
      },
    });
  };

  const nivelActualizar = (values: any, setSubmitting: any) => {
    updateNivelMutation.mutate({
      ...values,
      id: id,
    });
    setSubmitting(false);
  };

  return (
    <IonPage className="fondo">
      <IonContent fullscreen className="bg-light">
        <IonGrid className="bg-light">
          <HeaderInterior />
          <IonRow className="mt-0">
            <NavLateral />
            <IonCol size="10" className="px-3">
              <div className="pb-2">
                <p>Formulario de nivel</p>
              </div>
              <IonCard className="m-0 card-slide shadow-full">
                <IonCardContent className="card-content-slide height-vh-con-table">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={advancedSchema}
                    onSubmit={(values, actions) => {
                      if (id === "nuevo") {
                        nivelAgregar(
                          values,
                          actions.setSubmitting,
                          actions.resetForm
                        );
                      } else {
                        nivelActualizar(values, actions.setSubmitting);
                      }
                      setTimeout(() => {
                        actions.setSubmitting(false);
                      }, 500);
                    }}
                    enableReinitialize
                  >
                    {({ isSubmitting }) => {
                      return (
                        <Form>
                          <h2>
                            {id === "nuevo" ? "Agregar Nivel" : "Editar Nivel"}
                          </h2>
                          <FieldText label="Nombre" name="nombre" type="text" />

                          <FieldText
                            label="Descripción"
                            name="descripcion"
                            type="text"
                          />

                          <FieldSelect label="Estatus" name="estatus">
                            <option value="">Seleccione</option>
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                          </FieldSelect>

                          <div className="w-100 text-center mt-3">
                            <IonButton
                              disabled={isSubmitting}
                              className="btn-outline text-info"
                              fill="outline"
                              type="submit"
                            >
                              {isSubmitting ? (
                                <>
                                  <span className="spinner-border spinner-border-sm"></span>{" "}
                                  Creando nivel...
                                </>
                              ) : (
                                "Guardar"
                              )}
                            </IonButton>
                          </div>

                          {/*addNivelMutation.isSuccess && <div className="alert alert-success">
                              El nivel fue guardado exitosamente
                              <button onClick={addNivelMutation.reset} type="button" className="btn-close float-right text-body">x</button>
                              </div>*/}
                        </Form>
                      );
                    }}
                  </Formik>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonToast
          isOpen={notificacion.estado}
          onDidDismiss={() =>
            setNotificacion({ ...notificacion, estado: false })
          }
          message={notificacion.msg}
          duration={600}
        />
      </IonContent>
    </IonPage>
  );
};

export default Nivel;
