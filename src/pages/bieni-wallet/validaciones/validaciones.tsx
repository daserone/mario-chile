import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Manual from "./manual/Manual";
import Dependiente from "./dependiente/Dependiente";
import Correo from "./correo/Correo";

const Validacion = () => {
  const [key, setKey] = useState("manual");

  return (
    <>
      <Row>
        <Col>
          <h2 className="my-2">BieniWallet/Validación</h2>
          <Card>
            <Card.Body>
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onSelect={(k: any) => setKey(k)}
                className="mb-3"
              >
                <Tab eventKey="manual" title="Manual">
                  <Manual />
                </Tab>
                <Tab eventKey="dependiente" title="Dependientes">
                  <Dependiente />
                </Tab>
                <Tab eventKey="correo" title="Verificación de correo">
                  <Correo />
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Validacion;
