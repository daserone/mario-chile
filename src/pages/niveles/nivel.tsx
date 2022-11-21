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
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./niveles.css";
import { valNiveles } from "../../helpers/validacion";
import { serviciosNiveles } from "../../servicios/servicios";
import { nivelService } from "../../servicios/niveles";
import MyTextInput from "../usuarios/MyTextInput";
import MySelect from "../usuarios/MySelect";
import { Formik, Form } from "formik";
import { advancedSchema } from "../usuarios/validaciones.js";

const Nivel: React.FC = () => {
  const history = useHistory();
  const { id }: any = useParams();
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

  useEffect(() => {
    nivelService.getById(id).then((nivel) => {
      /*const fields = ["nombre", "descripcion", "estatus"];
        fields.forEach((field) =>
          Formik.setFieldValue(field, nivel[field], false)
        );*/
      setState(nivel);
    });
  }, []);

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

  const handleNiveles = (event: any) => {
    history.push("/app/niveles");
  };

  const handleUsuarios = (event: any) => {
    history.push("/app/usuarios");
  };

  const handleAdd = () => {
    const { estado, msg } = valNiveles(nombre, descripcion);
    if (estado) {
      let formDa = new FormData();
      formDa.append("op", "addNivel");
      formDa.append("nombre", nombre);
      formDa.append("descripcion", descripcion);
      formDa.append("estatus", estatus);
      serviciosNiveles(formDa)
        .then(function (response: any) {
          const { data, status } = response;
          if (status === 200) {
            if (data.rsp === 1) {
              setNotificacion({
                msg: data.msg,
                estado: true,
              });

              const state: any = {
                nombre: nombre,
                descripcion: descripcion,
                estado: estado,
              };
            } else {
              setNotificacion({
                msg: data.msg,
                estado: true,
              });
            }
          }
        })
        .catch(function (err) {
          console.warn("Error:" + err);
        });
    } else {
      setNotificacion({
        msg: msg,
        estado: true,
      });
    }
  };
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
  console.log(state);
  console.log(initialValues);
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

          {/*<IonRow className="mt-0">
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
                  onClick={handleNiveles}
                  className="mb-3 active"
                >
                  <IonImg
                    src={"./images/configuracion.svg"}
                    className="mr-2"
                    style={{ width: "26px" }}
                  />
                  <IonLabel>Niveles</IonLabel>
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
                <p>Formulario de nivel</p>
              </div>
              <IonCard className="m-0 card-slide shadow-full">
                <IonCardContent className="card-content-slide height-vh-con-table">
                  <IonItem>
                    <IonLabel position="stacked">
                      Nombre <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput
                      name="nombre"
                      value={nombre}
                      onIonChange={(e) => {
                        setNombre(e.detail.value!);
                      }}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">
                      Descripci&oacute;n <span className="text-danger">*</span>
                    </IonLabel>
                    <IonInput
                      name="descripcion"
                      value={descripcion}
                      onIonChange={(e) => {
                        setDescripcion(e.detail.value!);
                      }}
                    ></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">
                      Estado <span className="text-danger">*</span>
                    </IonLabel>
                    <IonSelect
                      interface="action-sheet"
                      placeholder="Seleccione"
                      value={estatus}
                      onIonChange={(e: any) => setEstatus(e.detail.value!)}
                    >
                      <IonSelectOption value="1">Activo</IonSelectOption>
                      <IonSelectOption value="2">Inactivo</IonSelectOption>
                    </IonSelect>
                  </IonItem>

                  <div className="pt-2 text-center">
                    <IonButton
                      className="btn-outline text-info"
                      fill="outline"
                      onClick={handleAdd}
                    >
                      Guardar
                    </IonButton>
                    <IonButton
                      color="danger"
                      className="btn-outline d-none"
                      fill="outline"
                      onClick={handleNiveles}
                    >
                      Cancelar
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
                    </IonRow>*/}
          <Formik
            initialValues={initialValues}
            validationSchema={advancedSchema}
            //onSubmit={onSubmit}
            onSubmit={(values, actions) => {
              if (isAddMode === "nuevo") {
                createNivel(values, actions.setSubmitting, actions.resetForm);
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
            enableReinitialize
          >
            {({ isSubmitting, setFieldValue }) => {
              return (
                <Form>
                  <h2>
                    {isAddMode === "nuevo" ? "Agregar Nivel" : "Editar Nivel"}
                  </h2>
                  <MyTextInput label="Nombre" name="nombre" type="text" />

                  <MyTextInput
                    label="Descripción"
                    name="descripcion"
                    type="text"
                  />

                  <MySelect label="Estatus" name="estatus">
                    <option value="">Seleccione</option>
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                  </MySelect>

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

export default Nivel;
