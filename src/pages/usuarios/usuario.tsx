import React, { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonToast,
  IonButton,
} from "@ionic/react";
import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";
import { advancedSchema } from "./validaciones.js";
import { nivelService } from "../../servicios/niveles";
import { FieldSelect, FieldText } from "../../components";
import { NavLateral, HeaderInterior } from "../../components";
import "./usuarios.css";
const Usuario: React.FC = () => {
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

  let isAddMode = id;

  const initialValues = {
    nombre: state.nombre || "",
    descripcion: state.descripcion || "",
    estatus: state.estatus || "",
  };

  function onSubmit(fields: any, { setStatus, setSubmitting, resetForm }: any) {
    setStatus();
    if (id === "nuevo") {
      createNivel(fields, setSubmitting, resetForm);
    } else {
      updateNivel(id, fields, setSubmitting, resetForm);
    }
  }

  function createNivel(
    fields: any,
    setSubmitting: (arg0: boolean) => void,
    resetForm: Function
  ) {
    nivelService
      .create(fields)
      .then(() => {
        //alertService.success('User added', { keepAfterRouteChange: true });
        setNotificacion({
          msg: "Nivel agregado",
          estado: true,
        });
        resetForm({});
        //history.push('.');
      })
      .catch((error: any) => {
        setSubmitting(false);
        //alertService.error(error);
        console.warn("Error:" + error);
      });
  }

  function updateNivel(
    id: any,
    fields: any,
    setSubmitting: (arg0: boolean) => void,
    resetForm: Function
  ) {
    fields["id"] = id;
    nivelService
      .update(id, fields)
      .then(() => {
        //alertService.success('User updated', { keepAfterRouteChange: true });
        setNotificacion({
          msg: "Nivel actualizado",
          estado: true,
        });
        //resetForm({})
        //history.push('..');
      })
      .catch((error: any) => {
        setSubmitting(false);
        //alertService.error(error);
        console.warn("Error:" + error);
      });
  }

  useEffect(() => {
    nivelService.getById(id).then((nivel) => {
      setState(nivel);
    });
  }, []);

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
                    enableReinitialize
                    //onSubmit={onSubmit}
                    onSubmit={(values, actions) => {
                      if (isAddMode === "nuevo") {
                        createNivel(
                          values,
                          actions.setSubmitting,
                          actions.resetForm
                        );
                      } else {
                        updateNivel(
                          id,
                          values,
                          actions.setSubmitting,
                          actions.resetForm
                        );
                      }
                      setTimeout(() => {
                        actions.setSubmitting(false);
                      }, 500);
                    }}
                  >
                    {({ isSubmitting }) => {
                      return (
                        <Form>
                          <h2>
                            {isAddMode === "nuevo"
                              ? "Agregar Nivel"
                              : "Editar Nivel"}
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
                              {isSubmitting && (
                                <span className="spinner-border spinner-border-sm mr-1"></span>
                              )}
                              Guardar
                            </IonButton>
                          </div>
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
          duration={500}
        />
      </IonContent>
    </IonPage>
  );
};

export default Usuario;
