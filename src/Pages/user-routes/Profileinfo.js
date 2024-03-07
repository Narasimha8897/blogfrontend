import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getUser } from '../../Services/user-service.js'
import {  Card, CardBody, Col, Container, Row, Table } from 'reactstrap'
import UserContext from '../../context/UserContext'

function Profileinfo() {
  const userContextData = useContext(UserContext)
  const navigate = useNavigate()
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  useEffect(() => {
    getUser(userId).then(data => {
      setUser({ ...data })
    }).catch(error => {
      console.log(error)
    })
  }, [userId])

  return (
    <div>
      {
        userContextData.user.islogin && user ?
          <Container>
            <Row>
              <Col md={{ size: 8, offset: 2 }} className='mt-5'>
                <Card>
                  <CardBody>
                    <h3 className='text-uppercase'>user Information</h3>
                    <Table
                      bordered
                      hover
                      responsive
                      striped
                    >
                      <tbody>
                        <tr>
                          <td>
                            USER_ID
                          </td>
                          <td>
                            {user.id}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            NAME
                          </td>
                          <td>
                            {user.name}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            EMAIL
                          </td>
                          <td>
                            {user.email}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            ABOUT
                          </td>
                          <td>
                            {user.about}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            ROLE
                          </td>
                          <td>
                            {user.roles.map((role,index) => {
                              return (
                                <span key={index}>{role.name}</span>
                              )
                            })}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <div className='d-flex align-items-around justify-content-around'>
                    <Link className='btn btn-warning' to={`/user/edit-profile/${user.id}`}>Update Profile</Link>
                    <Link className='btn btn-secondary' to={`/user/change-password`}>Change Password</Link>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container> : navigate('/')

      }
    </div>
  )
}

export default Profileinfo