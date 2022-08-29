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

function CarNew() {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const [data, setData] = useState([]);
  const [plate, setPlate] = useState("");
  const [type, setType] = useState("");

  //@ts-ignore
  const loadData = async (event) => {
    if (data.length == 0 && data != undefined) {
      const res = await fetch("http://localhost:8000/api/v1/car/types", {
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

    const handlesInputChange = async (event) => {
      const target = event.target;
      setType(target.value);
    };

  const SendEntryStates = async (event: any) => {
    event.preventDefault();
    const res = await fetch("http://localhost:8000/api/v1/cars", {
      headers: {
        "Content-Type": "application/json",
        "X-Authorization":
          "pHg59SSdC0UvdBWy1Ks7gPr6JV4ouCqyAB3RRdeHoUeXau9KvWKtiBlpGAhTrGkh",
      },
      method: "POST",
      body: JSON.stringify({
        plate,
        car_type_id: type,
        info:{}
      }),
    });
    loadData(event);
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

                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Tipo de auto</Form.Label>
                  <Form.Select
                    onChange={handlesInputChange}
                    aria-label="Default select example"
                  >
                    <option>Open this select menu</option>
                    {data.map((data) => (
                      <option value={data.id}>{data.car_type}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button
                  variant="primary"
                  onClick={SendEntryStates}
                  type="submit"
                >
                  Dar de alta
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CarNew;
