import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import {
  Nav,
  Navbar,
  Container,
  NavDropdown,
  Form,
  Button,
  Row,
  Col,
  Card,
  Table,
} from "react-bootstrap";
import stream from "stream";
import { promisify } from "util";

const pipeline = promisify(stream.pipeline);
function Secret(req, res) {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const [data, setData] = useState([]);
  const [plate, setPlate] = useState("");

  //@ts-ignore
  const loadData = async (event) => {
    if (data.length == 0 && data != undefined) {
      const res = await fetch("http://localhost:8000/api/v1/parking/times", {
        headers: {
          "Content-Type": "application/json",
          "X-Authorization":
            "pHg59SSdC0UvdBWy1Ks7gPr6JV4ouCqyAB3RRdeHoUeXau9KvWKtiBlpGAhTrGkh",
        },
        method: "GET",
      });
      const result = await res.json();
      console.log(result);
      setData(result);
    }
  };

  //@ts-ignore
  const handleInputChange = async (event) => {
    const target = event.target;
    setPlate(target.value);
  };

  const SendEntryStates = async (event: any) => {
    event.preventDefault();
    const res = await fetch("http://localhost:8000/api/v1/parking/times", {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization":
          "pHg59SSdC0UvdBWy1Ks7gPr6JV4ouCqyAB3RRdeHoUeXau9KvWKtiBlpGAhTrGkh",
      },
      method: "POST",
      body: JSON.stringify({
        plate,
      }),
    });
    loadData(event);
  };

  const SendMountInit = async (event: any) => {
    event.preventDefault();
    const res = await fetch("http://localhost:8000/api/v1/parking/times/0", {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization":
          "pHg59SSdC0UvdBWy1Ks7gPr6JV4ouCqyAB3RRdeHoUeXau9KvWKtiBlpGAhTrGkh",
      },
      method: "DELETE",
    });
    loadData(event);
  };

  const SendFileDonw = async (event: any) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8000/api/v1/payments", {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization":
          "pHg59SSdC0UvdBWy1Ks7gPr6JV4ouCqyAB3RRdeHoUeXau9KvWKtiBlpGAhTrGkh",
      },
      method: "POST",
      body: JSON.stringify({ file: "reporte" }),
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=dummy.pdf");
    await pipeline(response.body, res);

    loadData(event);
  };

  const SendOutStates = async (event: any) => {
    event.preventDefault();
    const res1 = await fetch("http://localhost:8000/api/v1/parking/times/0", {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization":
          "pHg59SSdC0UvdBWy1Ks7gPr6JV4ouCqyAB3RRdeHoUeXau9KvWKtiBlpGAhTrGkh",
      },
      method: "PUT",
      body: JSON.stringify({
        plate,
      }),
    });
    const res2 = await fetch("http://localhost:8000/api/v1/parking/times", {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization":
          "pHg59SSdC0UvdBWy1Ks7gPr6JV4ouCqyAB3RRdeHoUeXau9KvWKtiBlpGAhTrGkh",
      },
      method: "GET",
    });
    const result = await res2.json();
    console.log(result);
    setData(result);
  };

  function ShowData(data: any) {
    return (
      <tbody>
        <tr>
          <td>{data.plate}</td>
          <td>{data.car_entry}</td>
        </tr>
      </tbody>
    );
  }

  useEffect(() => {
    let status = false;
    if (status == false) {
      status = true;
      loadData({});
    }
  });

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}></Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Header>Control de ingreso</Card.Header>
            <Card.Body>
              <Form onSubmit={() => {}}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Placa</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={plate}
                    onChange={handleInputChange}
                    placeholder="Placa"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  onClick={SendEntryStates}
                  type="submit"
                >
                  Entrada de auto
                </Button>

                <Button
                  id="new-secret-btn"
                  onClick={SendOutStates}
                  variant="primary"
                  type="submit"
                >
                  Salida de auto
                </Button>

                <Button
                  id="new-secret-btn"
                  onClick={SendFileDonw}
                  variant="primary"
                  type="submit"
                >
                  Pagos de recidentes
                </Button>

                <Button
                  id="new-secret-btn"
                  onClick={SendMountInit}
                  variant="primary"
                  type="submit"
                >
                  Comensar mes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <p></p>
        </Col>
      </Row>
      <Row>
        <Card>
          <Card.Header>Estacionados</Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Auto placa</th>
                  <th>Fecha de ingreso</th>
                </tr>
              </thead>
              {data.map(ShowData)}
            </Table>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default Secret;
