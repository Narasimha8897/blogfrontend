import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { doLogout, getCurrentUserDetail, isLoggedIn, isTimeOut } from '../auth';
import UserContext from '../context/UserContext.js';

function CustomNavbar() {
  const userContextData = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false);
  const [login,setLogin]=useState(false);
  const [user,setUser]=useState(undefined);
  const navigate = useNavigate();
  useEffect(()=>{
    setLogin(isLoggedIn())
    setUser(getCurrentUserDetail())
  },[login]);
  const logout =()=>{
    doLogout(()=>{
      setLogin(false);
      userContextData.setUser({
        data:null,
        islogin:false
      })
      navigate("/")
    })
  }
  const timeout = ()=>{
    if(!isLoggedIn() || isTimeOut()){
      userContextData.setUser({
        data:null,
        islogin:false
      })
    }
  }
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color='dark' dark expand="md">
        <NavbarBrand tag={ReactLink} to="/">Blogs</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} onClick={timeout} to="/posts">
                My Feed
              </NavLink>
            </NavItem>
            { login && (
            <NavItem>
              <NavLink tag={ReactLink} onClick={timeout} to="/user/dashboard">
                Dashboard
              </NavLink>
            </NavItem>)
            }
            {
              userContextData.user.islogin && userContextData.user.data.roles[0].id===501?
              <>
                  <NavItem>
              <NavLink tag={ReactLink} onClick={timeout} to="/user/admin-dashboard">
                Admin Dashboard 
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} onClick={timeout} to="/user/category-dashboard">
                Category Dashboard
              </NavLink>
            </NavItem>
            </>:null
            }
            
          </Nav>
          <Nav  navbar>
          {
            login && (<>
              <NavItem>
              <NavLink tag={ReactLink} onClick={timeout} to={`/user/profile-info/${user.id}`}>
                Profile Info
              </NavLink>
            </NavItem>
              <NavItem>
              <NavLink onClick={logout} tag={ReactLink} to="/">
                Logout
              </NavLink>
            </NavItem>
            
            </>
              
            )
          }
          {
            !login && (
              <>
              <NavItem>
              <NavLink tag={ReactLink} to="/login">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/signup">
                Signup
              </NavLink>
            </NavItem>
              </>
            )
          }
           
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default CustomNavbar