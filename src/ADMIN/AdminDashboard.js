import React, { useContext, useEffect, useState } from 'react'
import { deleteUserById, getAllUsers } from '../Services/user-service'
import { Button, Card, CardBody, Col, Container, Row, Table } from 'reactstrap'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { isLoggedIn, isTimeOut } from '../auth'

function AdminDashboard() {
  const [users,setUsers]=useState([])
  const userContextData = useContext(UserContext);
  const navigate = useNavigate()
  useEffect(()=>{
    getAllUsers().then((data) => {
      setUsers(data);
    }).catch(error => {
      console.log("Error in Loading users",error)
    })
  },[])
  const timeout = ()=>{
    userContextData.setUser({
      data:null,
      islogin:false
    })
    navigate("/login")
}
  const deleteUser=(userId)=>{
    if(!isLoggedIn() || isTimeOut()){
      timeout();
      return
    }
    let result=window.confirm(`Do you want to delete user with id ${userId} permanentely!! `)
    if(result){
      deleteUserById(userId).then(res=>{
        toast.success(res.message)
        getAllUsers().then((data) => {
          setUsers(data);
        }).catch(error => {
          console.log("Error in Loading users",error)
        })
      }).catch((error)=>{
        console.log(error)
      })
    }
    else{

    }
    
  }
  return (
    <div>
    <Container>
            <Row>
              <Col md={{ size: 8, offset: 2 }} className='my-5'>
                <Card>
                  <CardBody>
                    <h3 className='text-uppercase'>user Information</h3>
                    <Table
                      bordered
                      hover
                      responsive
                      striped
                    >
                                          
        <thead>
        <tr>
        <th>USER_ID</th>
          <th>USER_MAIL</th>
          <th>USER_ROLE</th>
          <th>ACTION</th>
        </tr>
        </thead>
                      <tbody>
                      {
          users && users.map((user,index)=>(
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.roles.map((role,index) => {
                              return (
                                <span key={index}>{role.name}</span>
                              )
                            })}</td>
              <td><Button color='danger' onClick={()=>deleteUser(user.id)}>Delete</Button></td>
            </tr>
          ))
        }
                       
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>

    </div>
  )
}

export default AdminDashboard