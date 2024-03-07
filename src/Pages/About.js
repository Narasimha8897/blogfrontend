import React, { useContext } from 'react'
import Base from '../Components/Base'
import UserContext from '../context/UserContext'
import { Col, Container, Row } from 'reactstrap'

function About() {
  const userContextData = useContext(UserContext)
  return (

      <Base>
      <div>
      <Container>
        <Row>
          <Col>
          <h1>About Us</h1>
        <p>My name is <b>{userContextData.user.islogin && userContextData.user.data.name}</b></p>
          </Col>
        </Row>
      </Container>
        
        </div>
      </Base>

  )
}

export default About