import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Manual from "./manual/Manual";
import Dependiente from "./dependiente/Dependiente";
import Correo from "./correo/Correo";
import hammer from "@src/assets/icons/hammer.svg";
import hammerActive from "@src/assets/icons/hammer-active.svg";
import lego from "@src/assets/icons/lego.svg";
import legoActive from "@src/assets/icons/lego-active.svg";
import mail from "@src/assets/icons/mail.svg";
import mailActive from "@src/assets/icons/mail-active.svg";
//Style;
import "./Validaciones.scss";

const Validacion = () => {
  const [key, setKey] = useState("manual");

  return (
    <>
      <Row>
        <Col>
          <h2 className="my-2">BieniWallet/Validación</h2>
          <Card>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onSelect={(k: any) => setKey(k)}
              className="mb-2"
            >
              <Tab
                eventKey="manual"
                title={
                  <span>
                    <img
                      src={key == "manual" ? hammerActive : hammer}
                      alt="manual-icon"
                      className="me-1"
                    />
                    Manual
                  </span>
                }
              >
                <Manual />
              </Tab>
              <Tab
                eventKey="dependiente"
                title={
                  <span>
                    <img
                      src={key == "dependiente" ? legoActive : lego}
                      alt="dependiente-icon"
                      className="me-1"
                    />
                    Dependiente
                  </span>
                }
              >
                <Dependiente />
              </Tab>
              <Tab
                eventKey="correo"
                title={
                  <span>
                    <img
                      src={key == "correo" ? mailActive : mail}
                      alt="correo-icon"
                      className="me-1"
                    />
                    Verificación de correo
                  </span>
                }
              >
                <Correo />
              </Tab>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Validacion;
