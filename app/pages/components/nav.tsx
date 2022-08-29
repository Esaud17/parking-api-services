import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Nav, Navbar, Container,Image, NavDropdown } from "react-bootstrap";
import DropMenuProfile from "./drop-menu-profile";
//import Image from 'next/image'

function Navegation(){
 
  return(
    <Navbar bg="primary" variant="dark">
        <Container fluid>
        <Navbar.Brand>
            <Image 
            alt=""
            src="/robot.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
            id="img-brand"
            />
        Parking
        </Navbar.Brand>
        <DropMenuProfile/>

        </Container>
    </Navbar>
    );
}

export default Navegation




                

               
                    

