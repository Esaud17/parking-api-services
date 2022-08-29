import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Nav, Navbar, Container, Image, NavDropdown } from "react-bootstrap";
//import Image from 'next/image'

function DropMenuProfile(){
    const { user, isAuthenticated, isLoading, logout, loginWithRedirect  } = useAuth0();

    if(isAuthenticated){
        return <Nav className="justify-content-end">
            <Navbar.Toggle aria-controls="navbar-dark-profile" />
            <Navbar.Collapse id="navbar-dark-profile">
            <Nav>
                <Nav.Link href="/profile">Ingreso</Nav.Link>
                <Nav.Link href="/car">Alta de coche</Nav.Link>
                <NavDropdown
                id="nav-dropdown-dark-profile"
                title={
                     <span className="pull-left">
                        <Image className="thumbnail-image" 
                            //@ts-ignore 
                            src={user.picture} 
                            alt="user pic"
                            width={25}
                            height={25}
                            id="img-profile"
                        />
                        
                        <span>{//@ts-ignore 
                        user.name }</span>
                    </span>
                }
                menuVariant="dark"
                >
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logout({ returnTo: window.location.origin })} >Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav> 
            </Navbar.Collapse>
        </Nav>;
    } else {
        return <Nav className="justify-content-end">
             <Nav.Link onClick={() => loginWithRedirect()}>Login</Nav.Link>
        </Nav>;
    }
  }

  export default DropMenuProfile