import React from 'react'
import Base from '../Components/Base'
import NewFeed from '../Components/NewFeed'
import {  Col, Container, Row } from 'reactstrap'
import CategorySideMenu from '../Components/CategorySideMenu'

function Home() {
  return (
    <Base>
      <div>
        <Container>
          <Row>
            <Col md={{ size: 2 }} className='mt-2'>
              <CategorySideMenu />
            </Col>
            <Col md={{ size: 8 }}>
              <NewFeed />
            </Col>
          </Row>
        </Container>
      </div>
    </Base>
  )
}

export default Home