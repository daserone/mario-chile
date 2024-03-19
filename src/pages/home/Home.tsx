import BumpChart from "@src/component/charts/BumpChart";
import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { BarChart } from "react-feather";

const Home = () => {
  return (
    <>
      <h3 className="my-3">BIENVENIDO</h3>
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex">
              <h4 className="my-2">Bump Chart</h4>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col
                  sm="4"
                  style={{
                    height: "300px",
                  }}
                >
                  <BumpChart />
                </Col>
                <Col
                  sm="4"
                  style={{
                    height: "100vh",
                  }}
                >
                  <BarChart />
                </Col>
                <Col
                  sm="4"
                  style={{
                    height: "300px",
                  }}
                >
                  <BumpChart />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Home;
