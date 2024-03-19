import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, CardTitle, Form, Button, CardText } from "react-bootstrap";
import toast from "react-hot-toast";
//Hook
import { useForm } from "../../hooks";
//Assets
import bieni from "@assets/images/logo/logo-name.png";
import fondo from "@assets/images/pages/fondo.svg";
//Redux
//Service
import { doLogin } from "@services/usuario.service";
//Model
import { ResponseNotificacion } from "@src/models";
//Style
import "../../@core/scss/react/pages/page-authentication.scss";
import useAuth from "@src/@core/hooks/useAuth";
type inputs = {
  email: string;
  contrasena: string;
};

const Login = () => {
  const history = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const { value, handleSubmit, handleInput } = useForm({
    email: "",
    contrasena: "Australopithecus",
  });

  const { saveUser } = useAuth();
  const onSubmit = (value: inputs) => {
    if (value.email === "") {
      toast.error("Agregue el correo.");
      return;
    }
    if (value.contrasena === "") {
      toast.error("Agregue la contraseña.");
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const form: any = new FormData();
    form.append("op", "dologinWithCredencial");
    form.append("correo", value.email.trim());
    form.append("clave", value.contrasena.trim());
    doLogin(form)
      .then((rsp) => {
        const { status, data } = rsp;
        if (status === 200) {
          const { responseCode, item }: ResponseNotificacion = data;
          if (responseCode === 1) {
            // saveUser({ ...item, token: "test-token" });
            saveUser(item);
            history("/usuarios", { replace: true });
          } else {
            toast.error("Correo o contraseña incorrecta.");
          }
        }
      })
      .catch((e) => {
        console.error(e);
        toast.error("Error al procesar solicitud.");
      });
  };

  const restorePassword = () => {
    history(`/sendEmailPassword`);
  };

  return (
    <div
      className="auth-wrapper auth-cover"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Row className="auth-inner m-0 py-4 d-flex justify-content-center">
        <Col
          className="d-flex align-items-center auth-bg px-5 rounded shadow-sm"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <div className="fondo__img text-center">
              <img width="200px" height="150px" src={bieni} alt="logo"></img>
            </div>
            <CardTitle className="fw-bolder my-1 text-center text-info">
              Nowli Express
            </CardTitle>
            <CardText className="mb-2  text-center">
              <small>¡Bienvenido! Por favor inicie sesión.</small>
            </CardText>
            <Form
              className="auth-login-form mt-2"
              action=""
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-1">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={value?.email ?? ""}
                    placeholder="name@example.com"
                    onChange={handleInput}
                  />
                </Form.Group>
              </div>
              <div className="mb-1">
                <div className="mb-1">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      name="contrasena"
                      type="password"
                      value={value.contrasena || ""}
                      placeholder="******************"
                      onChange={handleInput}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="center my-2">
                <div className="pt-1 text-center text-dark fw-bold">
                  <span
                    onClick={() => {
                      restorePassword();
                    }}
                    className="cursor-pointer text-primary"
                  >
                    Olvidé mi contraseña
                  </span>
                </div>
              </div>
              {
                <div className="mb-2">
                  <input
                    type="checkbox"
                    id="recordar"
                    className="cursor-pointer"
                    style={{ marginRight: 5 }}
                    checked={rememberMe}
                    onChange={() => {
                      setRememberMe(!rememberMe);
                    }}
                  />
                  <label htmlFor="recordar" className="cursor-pointer">
                    Recordarme
                  </label>
                </div>
              }
              <div className="d-flex justify-content-center">
                <Button size="lg" type="submit">
                  Iniciar Sesión
                </Button>
              </div>
              <div className="center">
                <div className="pt-1 text-center">
                  <div className="divider my-1">
                    <div className="divider-text">o</div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <div className="fw-bold mb-2 text-dark">
                  <small>
                    ¿Necesitas ayuda?{" "}
                    <small
                      onClick={() => {
                        history("/contactanos");
                      }}
                      className="cursor-pointer text-primary"
                    >
                      Contáctanos
                    </small>
                  </small>
                </div>
              </div>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
