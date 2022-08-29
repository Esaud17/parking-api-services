import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from "react";
import { Container, Row } from 'react-bootstrap';
import useSWR from 'swr';
import Navegation from './components/nav';
import Secret from './components/new-secret';

export default function Profile(req , res) {
  const { isAuthenticated, isLoading} = useAuth0();

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if(!isAuthenticated){
    window.location.href = "/"
  };

  return (
    isAuthenticated && (
      <div>
        <Navegation></Navegation>
        <Container>
          <Row>
            <p></p>
            <p></p>
            <Secret res={res} req={req} ></Secret>
          </Row>
        </Container>
      </div>
    )
  );

}