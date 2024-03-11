import React, { useEffect, useState } from "react";
import { Card, Col, Row, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { difusionCard } from "../disusion/components/DifusionList";
import { cards } from "../disusion/components/DifusionList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import InformacionContent from "./components/InformacionContent";
import MensajeriaContent from "./components/MensajeriaContent";

const DifusionDetail = () => {
  const { id } = useParams();
  const [key, setKey] = useState("informacion");
  const [difusion, setDifusion] = useState<difusionCard>({
    id: "",
    title: "",
    description: "",
    isActive: false,
  });

  useEffect(() => {
    const difusion = cards.find((difusion) => difusion.id === id);
    setDifusion(
      difusion ?? {
        id: "",
        title: "",
        description: "",
        isActive: false,
      }
    );
  }, [id]);

  return (
    <>
      <Row>
        <Col>
          <h2 className="my-2">
            {" "}
            <span className="text-muted">BieniWallet / Difusión / </span>{" "}
            {difusion?.title}
          </h2>
          <Card>
            <Card.Header className="">
              <div className="d-flex flex-row align-items-center">
                <FontAwesomeIcon icon={faChevronLeft} size="xl" />
                <h1 className="mx-2">{difusion?.title}</h1>
                <span
                  className={`${
                    difusion?.isActive ? "active-badge" : "inactive-badge"
                  }`}
                >
                  {difusion?.isActive ? "Activo" : "Inactivo"}
                </span>
              </div>
            </Card.Header>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onSelect={(k: any) => setKey(k)}
              className="mb-2"
            >
              <Tab eventKey="informacion" title={<span>Información</span>}>
                <Card.Body>
                  <InformacionContent difusion={difusion} />
                </Card.Body>
              </Tab>
              <Tab eventKey="mensajeria" title={<span>Mensajería</span>}>
                <Card.Body>
                  <MensajeriaContent />
                </Card.Body>
              </Tab>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DifusionDetail;
