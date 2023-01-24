import React, { useState, useEffect } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonPage,
  IonImg,
  IonToast,
  IonThumbnail,
  IonSearchbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonLabel,
  IonItem,
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { advancedSchema } from "../usuarios/validaciones.js";
import {
  createAfiliado,
  getAfiliadoById,
  updateAfiliado,
} from "../../api/afiliadosApi";
import { FieldSelect, FieldCheckbox, FieldText } from "../../components";
import "./afiliados.css";
const Afiliado: React.FC = () => {
  const { id }: any = useParams();
  const history = useHistory();

  const user = useSelector((state: any) => state.reducerAuth.user);
  const [state, setState] = useState({
    id: "",
    descripcion: "",
    nombre: "",
    estatus: "",
  });

  let isAddMode = id;
  const initialValues = {
    nombre: state.nombre || "",
    descripcion: state.descripcion || "",
    estatus: state.estatus || "",
  };

  const { data: afiliado } = useQuery(
    ["afiliado", { id }],
    (id) => getAfiliadoById(id),
    {
      onSuccess: (res) => {
        setState(res.data);
      },
    }
  );

  const handelNotificaciones = () => {
    history.push("/app/notificaciones");
  };

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estatus, setEstatus] = useState("");
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });

  const handleAfiliados = (event: any) => {
    history.push("/app/afiliados");
  };

  const handleUsuarios = (event: any) => {
    history.push("/app/usuarios");
  };

  const queryClient = useQueryClient();

  const addAfiliadoMutation = useMutation({
    mutationFn: createAfiliado,
    onSuccess: (afiliado, variables) => {
      variables = { ...variables, id: afiliado.data.id };
      if (queryClient.getQueryData(["afiliados"])) {
        queryClient.setQueryData(["afiliados"], (prevAfiliados: any) =>
          prevAfiliados.concat(variables)
        );
      }
      setNotificacion({
        msg: "Afiliado agregado exitosamente",
        estado: true,
      });
    },
  });

  const updateAfiliadoMutation = useMutation({
    mutationFn: updateAfiliado,
    onSuccess: () => {
      if (queryClient.getQueryData(["afiliados"])) {
        queryClient.invalidateQueries(["afiliados"]);
      }
      setNotificacion({
        msg: "Afiliado actualizado exitosamente",
        estado: true,
      });
    },
  });

  const afiliadoAgregar = (
    afiliado: any,
    setSubmitting: any,
    resetForm: Function
  ) => {
    {
      /*e.preventDefault();
      const formData = new FormData(e.target);
      const afiliado = Object.fromEntries(formData);
    */
    }
    addAfiliadoMutation.mutate(afiliado, {
      onSuccess: () => {
        resetForm({});
        setSubmitting(false);
      },
    });
  };

  const afiliadoActualizar = (values: any, setSubmitting: any) => {
    updateAfiliadoMutation.mutate({
      ...values,
      id: id,
    });
    setSubmitting(false);
  };

  return (
    <IonPage className="fondo">
      <IonContent fullscreen className="bg-light">
        <IonGrid className="bg-light">
          <IonRow className="pt-4 pb-4 mb-2">
            <IonCol size="2" className="px-3 fs-14 text-white">
              <div className="d-inline">
                <img
                  src="./images/logo-bieni.svg"
                  alt="imagen"
                  className="d-inline"
                  width={25}
                />
                <p className="ml-3 fs-20 font-w600 text-info d-inline">Bieni</p>
              </div>
            </IonCol>
            <IonCol size="7" className="px-3 fs-14 text-white">
              <div
                className="searchContainer d-inline-block"
                style={{ width: "60%" }}
              >
                <form action="">
                  <IonSearchbar
                    placeholder="Buscar..."
                    slot="end"
                    class="px-0 py-0"
                  />
                  <input type="submit" style={{ display: "none" }} />
                </form>
              </div>
            </IonCol>
            <IonCol size="3" className="px-3">
              <div
                className="float-right fs-14 d-flex flex-row"
                onClick={handelNotificaciones}
                style={{ cursor: "pointer" }}
              >
                <div className="align-self-center">
                  <IonImg
                    src={"./images/notificaciones.svg"}
                    className="w-24-p"
                  />
                </div>
                <div className="ml-5 p-perfil-sub">
                  <IonThumbnail slot="start" class="">
                    <img src="./images/sandra.jpg" alt="Laura" />
                  </IonThumbnail>
                </div>
                <div className="ml-3 mr-2">
                  <span className="fs-15 font-w700 text-info d-block">
                    Dra. {}
                    {user.nombre}
                  </span>
                  <span className="text-info font-w600">Ginecología</span>
                </div>
              </div>
            </IonCol>
          </IonRow>

          <IonRow className="mt-0">
            <IonCol size="2" className="pl-0 pr-3">
              <div className="px-3 py-5 bg-info-alt border-menu menu-principal height-vh-content">
                <IonItem
                  lines="none"
                  button
                  onClick={() => {}}
                  className="mb-3"
                >
                  <IonImg
                    src={"./images/afiliados-light.svg"}
                    className="mr-3"
                    style={{ width: "20px" }}
                  />
                  <IonLabel>Mis pacientes</IonLabel>
                </IonItem>
                <IonItem
                  lines="none"
                  button
                  onClick={() => {}}
                  className="mb-3"
                >
                  <IonImg
                    src={"./images/doctor-light.svg"}
                    className="mr-3"
                    style={{ width: "20px" }}
                  />
                  <IonLabel>Perfil</IonLabel>
                </IonItem>
                <IonItem
                  lines="none"
                  button
                  onClick={() => {}}
                  className="mb-3"
                >
                  <IonImg
                    src={"./images/configuracion.svg"}
                    className="mr-2"
                    style={{ width: "26px" }}
                  />
                  <IonLabel>Soporte</IonLabel>
                </IonItem>
                <IonItem
                  lines="none"
                  button
                  onClick={handleAfiliados}
                  className="mb-3 active"
                >
                  <IonImg
                    src={"./images/configuracion.svg"}
                    className="mr-2"
                    style={{ width: "26px" }}
                  />
                  <IonLabel>Afiliados</IonLabel>
                </IonItem>
                <IonItem
                  lines="none"
                  button
                  onClick={handleUsuarios}
                  className="mb-3"
                >
                  <IonImg
                    src={"./images/configuracion.svg"}
                    className="mr-2"
                    style={{ width: "26px" }}
                  />
                  <IonLabel>Usuarios</IonLabel>
                </IonItem>
                <IonItem
                  lines="none"
                  button
                  onClick={() => {}}
                  className="mb-3"
                >
                  <IonImg
                    src={"./images/cerrar-sesion.svg"}
                    className="mr-3"
                    style={{ width: "20px" }}
                  />
                  <IonLabel>Cerrar sesi&oacute;n</IonLabel>
                </IonItem>
              </div>
            </IonCol>
            <IonCol size="10" className="px-3">
              <div className="pb-2">
                <p>Formulario de afiliado</p>
              </div>
              <IonCard className="m-0 card-slide shadow-full">
                <IonCardContent className="card-content-slide height-vh-con-table">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={advancedSchema}
                    onSubmit={(values, actions) => {
                      if (isAddMode === "nuevo") {
                        afiliadoAgregar(
                          values,
                          actions.setSubmitting,
                          actions.resetForm
                        );
                      } else {
                        afiliadoActualizar(values, actions.setSubmitting);
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
                            {isAddMode === "nuevo"
                              ? "Agregar Afiliado"
                              : "Editar Afiliado"}
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
                                  Creando afiliado...
                                </>
                              ) : (
                                "Guardar"
                              )}
                            </IonButton>
                          </div>

                          {/*addAfiliadoMutation.isSuccess && <div className="alert alert-success">
                              El afiliado fue guardado exitosamente
                              <button onClick={addAfiliadoMutation.reset} type="button" className="btn-close float-right text-body">x</button>
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

export default Afiliado;
