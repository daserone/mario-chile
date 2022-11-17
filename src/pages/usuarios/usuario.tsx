import React, { useState, useEffect } from "react";
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
  IonThumbnail,
  IonSearchbar,
  IonItem,
  IonLabel,
  IonButton,
  IonBadge,
  IonInput,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import ReactDOM from 'react-dom';
 import { Formik, Form, useField } from 'formik';
 import * as Yup from 'yup';
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./usuarios.css";
import { serviciosNiveles } from "../../servicios/servicios";

const Usuario: React.FC = () => {
  const history = useHistory();
  const {id}:any = useParams();
  const user = useSelector((state: any) => state.reducerAuth.user);
  const [load, setLoad] = useState<Boolean>(true);
  const [data, setData] = useState<any>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [select, setSelect] = useState<any>(null);

  const handelNotificaciones = () => {
    history.push("/app/notificaciones");
  };

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

  const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };
  
  const MyCheckbox = ({ children, ...props }) => {
    // React treats radios and checkbox inputs differently other input types, select, and textarea.
    // Formik does this too! When you specify `type` to useField(), it will
    // return the correct bag of props for you -- a `checked` prop will be included
    // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
      <div>
        <label className="checkbox-input">
          <input type="checkbox" {...field} {...props} />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };
  
  const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  return (
    <IonPage className="fondo">
      <IonContent fullscreen className="bg-light">
        <IonGrid className="bg-light">
          <IonRow className="pt-4 pb-4 mb-2">
            <IonCol size="2" className="px-3 fs-14 text-white">              
                <div className="d-inline">
                  <img src="./images/logo-bieni.svg" alt="imagen" className="d-inline" width={25} />
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
                <div className="float-right fs-14 d-flex flex-row"
                  onClick={handelNotificaciones}
                  style={{ cursor: "pointer" }}
                >
                  <div className="align-self-center">
                    <IonImg src={"./images/notificaciones.svg"} className="w-24-p" />
                  </div>
                  <div className="ml-5 p-perfil-sub">
                    <IonThumbnail slot="start" class="">
                      <img src="./images/sandra.jpg" alt="Laura" />
                    </IonThumbnail>
                  </div>
                  <div className="ml-3 mr-2">
                    <span className="fs-15 font-w700 text-info d-block">Dra. {}{user.nombre}</span>
                    <span className="text-info font-w600">Ginecología</span>
                  </div>
                </div>
            </IonCol>
          </IonRow>

          <IonRow className="mt-0">
            <IonCol size="2" className="pl-0 pr-3">
              {/*<Nav/>*/}

              <div className="px-3 py-5 bg-info-alt border-menu menu-principal height-vh-content">
                <IonItem lines="none" button onClick={() => { }} className="mb-3">
                  <IonImg
                    src={"./images/afiliados-light.svg"}
                    className="mr-3"
                    style={{ width: "20px" }}
                  />
                  <IonLabel>
                    Mis pacientes
                  </IonLabel>
                </IonItem>
                <IonItem lines="none" button onClick={() => { }} className="mb-3">
                  <IonImg
                    src={"./images/doctor-light.svg"}
                    className="mr-3"
                    style={{ width: "20px" }}
                  />
                  <IonLabel>
                    Perfil
                  </IonLabel>
                </IonItem>
                <IonItem lines="none" button onClick={() => { }} className="mb-3">
                  <IonImg
                    src={"./images/configuracion.svg"}
                    className="mr-2"
                    style={{ width: "26px" }}
                  />
                  <IonLabel>
                    Soporte
                  </IonLabel>
                </IonItem>
                <IonItem lines="none" button onClick={handleNiveles} className="mb-3 active">
                  <IonImg
                    src={"./images/configuracion.svg"}
                    className="mr-2"
                    style={{ width: "26px" }}
                  />
                  <IonLabel>
                    Niveles
                  </IonLabel>
                </IonItem>
                <IonItem lines="none" button onClick={handleUsuarios} className="mb-3">
                  <IonImg
                    src={"./images/configuracion.svg"}
                    className="mr-2"
                    style={{ width: "26px" }}
                  />
                  <IonLabel>
                    Usuarios
                  </IonLabel>
                </IonItem>
                <IonItem lines="none" button onClick={() => { }} className="mb-3">
                  <IonImg
                    src={"./images/cerrar-sesion.svg"}
                    className="mr-3"
                    style={{ width: "20px" }}
                  />
                  <IonLabel>
                    Cerrar sesi&oacute;n
                  </IonLabel>
                </IonItem>
              </div>
            </IonCol>
            <IonCol size="10" className="px-3">
              <div className="pb-2">
                <p>Formulario de nivel</p>
              </div>
              <IonCard className="m-0 card-slide shadow-full">
                <IonCardContent className="card-content-slide height-vh-con-table">
                  <Formik
                    initialValues={{
                      firstName: '',
                      lastName: '',
                      email: '',
                      acceptedTerms: false, // added for our checkbox
                      jobType: '', // added for our select
                    }}
                    validationSchema={Yup.object({
                      firstName: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                      lastName: Yup.string()
                        .max(20, 'Must be 20 characters or less')
                        .required('Required'),
                      email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                      acceptedTerms: Yup.boolean()
                        .required('Required')
                        .oneOf([true], 'You must accept the terms and conditions.'),
                      jobType: Yup.string()
                        .oneOf(
                          ['designer', 'development', 'product', 'other'],
                          'Invalid Job Type'
                        )
                        .required('Required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                      }, 400);
                    }}
                  >
                    <Form>
                      <MyTextInput
                        label="First Name"
                        name="firstName"
                        type="text"
                        placeholder="Jane"
                      />
            
                      <MyTextInput
                        label="Last Name"
                        name="lastName"
                        type="text"
                        placeholder="Doe"
                      />
            
                      <MyTextInput
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="jane@formik.com"
                      />
            
                      <MySelect label="Job Type" name="jobType">
                        <option value="">Select a job type</option>
                        <option value="designer">Designer</option>
                        <option value="development">Developer</option>
                        <option value="product">Product Manager</option>
                        <option value="other">Other</option>
                      </MySelect>
            
                      <MyCheckbox name="acceptedTerms">
                        I accept the terms and conditions
                      </MyCheckbox>
            
                      <button type="submit">Submit</button>
                    </Form>
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
