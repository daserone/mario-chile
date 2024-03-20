import BarChart from "@src/component/charts/BarChart";
import BumpChart from "@src/component/charts/BumpChart";
import LineChart from "@src/component/charts/LineChart";
import CardStatistic from "@src/component/statistics/CardStatistic";
import { Row, Col, Card } from "react-bootstrap";

const Home = () => {
  const data = [
    {
      id: 1,
      title: "Pedidos generados",
      quantity: "10",
      isMoney: false,
    },
    {
      id: 2,
      title: "Pedidos entregados",
      quantity: "10",
      isMoney: false,
    },
    {
      id: 3,
      title: "Productos vendidos",
      quantity: "1000.00",
      isMoney: true,
    },
    {
      id: 4,
      title: "Total vendidos",
      quantity: "1000.00",
      isMoney: true,
    },
    {
      id: 5,
      title: "Total general",
      quantity: "1000.00",
      isMoney: true,
    },
  ];

  return (
    <>
      <h3 className="my-3">BIENVENIDO</h3>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col sm="12" lg="8">
                  <h4>Mis Estadisticas</h4>
                </Col>
                <Col sm="12" lg="4">
                  <select name="date" id="" className="form-select mb-2">
                    <option value="" disabled selected hidden>
                      Fecha
                    </option>
                    <option value="hoy">Hoy</option>
                    <option value="semana">Esta semana</option>
                    <option value="mes">Este mes</option>
                    <option value="año">Este año</option>
                  </select>
                </Col>
              </Row>
              <Row>
                {/* col pedidos generados, col pedidos entregados, col productos vendidos, col total vendidos,col total general */}
                <Row xs={1} md={2} lg={5} className="gx-2 gy-2 gy-lg-0">
                  {data.map((_, idx) => (
                    <Col key={idx}>
                      <CardStatistic
                        title={_.title}
                        quantity={parseFloat(_.quantity)}
                        isMoney={_.isMoney}
                      ></CardStatistic>
                    </Col>
                  ))}
                </Row>
              </Row>
              <Row className="mt-2">
                <Col sm="12">
                  <h4>Rendimiento</h4>
                </Col>
                <Col
                  sm="12"
                  style={{
                    minHeight: "300px",
                    maxHeight: "400px",
                  }}
                >
                  <LineChart />
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
