import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, CardTitle, Form, Button, CardText } from "react-bootstrap";
import { useDispatch } from "react-redux";
//Hook
import { useForm } from "../../hooks";
//Assets
import bieni from "../../assets/images/logo/bieni-icon.svg";
import fondo from "../../assets/images/pages/fondo.svg";
//Redux
import { createUser } from "../../state/slice/user";
//Style
import "../../@core/scss/react/pages/page-authentication.scss";
///react/pages/page-authentication.scss
type inputs = {
  email: string;
  contrasena: string;
};

const Login = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(false);
  const { value, handleSubmit, handleInput } = useForm({
    email: "",
    contrasena: "",
  });

  const onSubmit = (value: inputs) => {
    console.log(value);
    const rsp = {
      id: 22323,
      name: "christopher",
      email: "carnevale",
      token: "fdfdsfdfkdhslgf",
      active: true,
    };
    dispatch(createUser(rsp));
    history("/usuarios", { replace: true });
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
      <Row className="auth-inner m-0 py-4">
        <Col
          className="d-none d-lg-flex align-items-center p-5"
          lg="4"
          sm="12"
        ></Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5 rounded shadow-sm"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <div className="fondo__img text-center">
              <img width="50rem" height="50rem" src={bieni} alt="logo"></img>
            </div>
            <CardTitle className="fw-bolder my-1 text-center" color="#5c586b">
              Bienvenido a BieniMédico
            </CardTitle>
            <CardText className="mb-2  text-center">
              Todos tus registros médicos en un solo lugar.
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
                    type="email"
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
                      type="contrasena"
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
                    className="cursor-pointer"
                    style={{ color: "#887ef2" }}
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
                    ¿Aún no utilizas BieniMédico?{" "}
                    <small
                      onClick={() => {
                        history("/contactanos");
                      }}
                      style={{ color: "#887ef2", cursor: "pointer" }}
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
