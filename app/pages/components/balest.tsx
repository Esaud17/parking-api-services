import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Nav, Navbar, Container, NavDropdown, Form, Button, Row, Col, Card, Table } from "react-bootstrap";
import Emoji from "react-emoji-render";

function Balest(){
  const { user, isAuthenticated, isLoading, logout  } = useAuth0();
  const [data, setData] = useState("");
  const [listado, setListado] = useState([{
    "word": "hola",
    "status": "N\D"
  },
  {
    "word": "(hola)",
    "status": "N\D"
  },
  {
    "word": "(()",
    "status": "N\D"
  },
  {
    "word": "())",
    "status": "N\D"
  },
  {
    "word": "(hola))",
    "status": "N\D"
  },
  {
    "word": "(:)",
    "status": "N\D"
  },
  {
    "word": "(hola:)",
    "status": "N\D"
  },
  {
    "word": ":(hola)",
    "status": "N\D"
  },
  {
    "word": ":(hola:)",
    "status": "N\D"
  },
  {
    "word": "no voy (:()",
    "status": "N\D"
  },
  {
    "word": "hoy pm: fiesta :):)",
    "status": "N\D"
  },
  {
    "word": ":((",
    "status": "N\D"
  },
  {
    "word": "a (b (c (d) c) b) a :)",
    "status": "N\D"
  }]);
  const [commerce, setCommerce] = useState("");

  //@ts-ignore
  const ExcuteApi = async event => {
    event.preventDefault()
    if(listado.length > 0 && listado != undefined){
        let data: { word: string; }[] = [];
        
        listado.forEach(element => {
            data.push({ word: element.word});
        });

        const res = await fetch(
        'https://blance-api-rbr.herokuapp.com/api/v1/balance/validate',
        {
            body: JSON.stringify({
                "list":data
            }),
            headers: {
            'Content-Type': 'application/json',
            'HTTP-X-API-KEY':'m1Qw2LRzUZlWehhinZeR'
            },
            method: 'POST'
        }
        )
        const result = await res.json()
        setListado(result);
    }
  }

    //@ts-ignore
    const handleInputChange = async event => {
        const target = event.target;
        setCommerce(target.value);
    }

  const ClearStates = ()=>{
    //@ts-ignore
    setData({});
    setCommerce("");
  }

  const AddStates = async()=>{
    //@ts-ignore
    let items = listado
    items.push({ word:commerce , status: "N/D" });
    setCommerce("");
    setListado(items);
    console.log(listado);
  }

  function ShowData(data:any){
      if(data.word !== undefined &&  data.word !== ""){
      return <tbody key={data.word} >
                <tr>
                    <td><Emoji text={data.word} /></td>
                    <td>{data.status}</td>
                </tr>
             </tbody>;
      }
  }

  return(
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                <Card>
                    <Card.Header>Test</Card.Header>
                    <Card.Body>
                        <Form  onSubmit={ClearStates}>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>string to test</Form.Label>
                                <Form.Control type="text" name="name" value={commerce} onChange={handleInputChange} placeholder="Enter string" />
                            </Form.Group>
                        
                            <Button variant="primary" onClick={() => AddStates()} >
                                Agregar
                            </Button>
                            <span> </span>
                            <Button id="new-Balest-btn" onClick={ExcuteApi} variant="primary" type="submit">
                                Ejecutar
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
                    <Card.Header>Result</Card.Header>
                    <Card.Body>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Test</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                           { listado.map(ShowData ) }
                        </Table>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
}


export default Balest




                

               
                    

