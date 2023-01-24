import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonImg,
  IonToast,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik } from "formik";
import { NavLateral, HeaderInterior } from "../../components";
import { getUsuariosId, postAddUsuario } from "../../servicios/usuarios";
import "./usuarios.css";

const Usuario: React.FC = () => {
  const history = useHistory();
  const { id }: any = useParams();
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    estado: "",
  });

  const queryClient = useQueryClient();
  const { error, isLoading } = useQuery(
    ["usuario", id],
    () => getUsuariosId(id),
    {
      onSuccess: (res) => {
        if (res.data) {
          setForm(res.data[0]);
        }
      },
    }
  );

  const addMutation = useMutation({
    mutationFn: postAddUsuario,
    onSuccess: (nivel, variables) => {
      variables = { ...variables, id: nivel.data.id };
      if (queryClient.getQueryData(["usuarios"])) {
        queryClient.setQueryData(["usuarios"], (prevNiveles: any) =>
          prevNiveles.concat(variables)
        );
      }
      setNotificacion({
        msg: "Usuario agregado de forma exitosa",
        estado: true,
      });
    },
  });
  /**
   * FORMULARIO FORMIK
   **/
  const initialValues = {
    nombre: "",
    apellido: "",
    correo: "",
    estado: "",
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.nombre) {
      errors.nombre = "Este campo es requerido";
    }

    if (!values.apellido) {
      errors.apellido = "Este campo es requerido";
    }

    if (!values.coreo) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Direccion de correo invalida";
    }

    return errors;
  };

  const handleAgregar = (
    values: any,
    setSubmitting: any,
    resetForm: Function
  ) => {
    console.log(values);
  };

  const handleActualizar = (values: any, setSubmitting: any) => {
    console.log(values);
  };

  const handleListado = (event: any) => {
    history.push("/usuarios");
  };
  /**
   * INFO REACT-QUERY
   **/
  if (isLoading) {
    return (
      <IonPage className="fondo">
        <IonContent fullscreen className="bg-light">
          <IonGrid className="bg-light">
            <IonRow
              className="pt-4 pb-4 mb-2 ion-justify-content-center"
              style={{
                height: "100vh",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span className="spinner-border mb-4"></span>
                <h1>Cargando....</h1>
              </div>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }

  if (error) {
    return (
      <IonPage className="fondo">
        <IonContent fullscreen className="bg-light">
          <IonGrid className="bg-light">
            <IonRow
              className="pt-4 pb-4 mb-2 ion-justify-content-center"
              style={{
                height: "100vh",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span className="spinner-border mb-4"></span>
                <h1>Error al realizar la solicitud....</h1>
              </div>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
  return (
    <IonPage className="fondo">
      <IonContent fullscreen className="bg-light">
        <IonGrid className="bg-light">
          <HeaderInterior />
          <IonRow className="mt-0">
            <NavLateral />
            <IonCol size="10" className="px-3">
              <div className="pb-2">
                <IonButton
                  className="btn-outline text-info fs-12"
                  fill="outline"
                  onClick={handleListado}
                >
                  <IonImg
                    src={"./images/descargar.svg"}
                    className="mr-2"
                    style={{ width: "16px" }}
                  />
                  Listado
                </IonButton>
                <IonButton
                  className="btn-outline text-info fs-12"
                  fill="outline"
                >
                  <IonImg
                    src={"./images/descargar.svg"}
                    className="mr-2"
                    style={{ width: "16px" }}
                  />
                  Exportar (Excel)
                </IonButton>
                <div className="float-right">
                  <IonButton
                    className="button-deg-gen fs-12 mr-2"
                    fill="outline"
                  >
                    <IonImg
                      src={"./images/filtrar.svg"}
                      className="mr-2 filter-white"
                      style={{ width: "16px" }}
                    />
                    Filtrar
                  </IonButton>
                  <IonButton className="button-deg-gen fs-12" fill="outline">
                    <IonImg
                      src={"./images/ordenar.svg"}
                      className="mr-2 filter-white"
                      style={{ width: "16px" }}
                    />
                    Ordenar
                  </IonButton>
                </div>
              </div>
              <IonCard className="m-0 card-slide shadow-full">
                <IonCardContent className="card-content-slide height-vh-con-table">
                  <Formik
                    initialValues={form || initialValues}
                    enableReinitialize
                    onSubmit={(values, actions) => {
                      if (id === "0") {
                        handleAgregar(
                          values,
                          actions.setSubmitting,
                          actions.resetForm
                        );
                      } else {
                        handleActualizar(values, actions.setSubmitting);
                      }
                      setTimeout(() => {
                        actions.setSubmitting(false);
                      }, 500);
                    }}
                  >
                    {({ values, errors, handleSubmit, handleChange }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="field">
                          <label className="label">Nombre</label>
                          <div className="control">
                            <input
                              type="text"
                              name="nombre"
                              onChange={handleChange}
                              value={values.nombre}
                            />
                          </div>
                          {errors.nombre && (
                            <div id="feedback">{errors.nombre}</div>
                          )}
                        </div>
                        <div className="field">
                          <label className="label">Apellido</label>
                          <div className="control">
                            <input
                              type="text"
                              name="apellido"
                              onChange={handleChange}
                              value={values.apellido}
                            />
                          </div>
                          {errors.apellido && (
                            <div id="feedback">{errors.apellido}</div>
                          )}
                        </div>
                        <div className="field">
                          <label className="label">Correo</label>
                          <div className="control">
                            <input
                              type="text"
                              name="correo"
                              onChange={handleChange}
                              value={values.correo}
                            />
                          </div>
                          {errors.apellido && (
                            <div id="feedback">{errors.correo}</div>
                          )}
                        </div>

                        <div className="field">
                          <label className="label">Estado</label>
                          <div className="control">
                            <div className="select is-rounded">
                              <select
                                id="estado"
                                name="estado"
                                onChange={handleChange}
                                value={values.estado}
                              >
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div>
                          <IonButton
                            className="button-deg-gen fs-12"
                            fill="outline"
                            type="submit"
                          >
                            Agregar
                          </IonButton>
                        </div>
                      </form>
                    )}
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
