import React, { useContext, useEffect, useState } from 'react'
import AddPost from '../../Components/AddPost'
import { Col, Container, Row } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn, isTimeOut } from '../../auth'
import { deletePostsById, getPostsByUser } from '../../Services/post-service.js'
import Post from '../../Components/Post'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../context/UserContext.js'

const UserDashboard=()=> {
  const [posts,setPosts]=useState([])
  const navigate = useNavigate()
  const userContextData = useContext(UserContext);
  useEffect(()=>{
    loadAllPosts()
  },[])
  function loadAllPosts(){
    if(!isLoggedIn()){
      return;
    }
    getPostsByUser(getCurrentUserDetail().id).then(data=>{
      setPosts([...data])
    }).catch(error=>{
      console.log(error)
    })
  }
  const timeout = ()=>{
    userContextData.setUser({
      data:null,
      islogin:false
    })
    navigate("/login")
}
  //delete post
  
  function deletePost(post){
    if(!isLoggedIn() || isTimeOut()){
      timeout();
      return
    }
    deletePostsById(post.postId).then(res=>{
      toast.success('Post Deleted Successfully !!')
      let newPosts = posts.filter(p=>p.postId!==post.postId)
      setPosts([...newPosts])
    }).catch(error=>{
      console.log(error)
    })
  }
  return (
    
    <div>
    <Container>
    <AddPost/>
    <Row>
      <Col md={{size:10,offset:1}}>
      <h4 className='mt-2'>Posts ({posts ? posts.length : 0})</h4>
      </Col>
    </Row>
    <Row className='mb-3'>
      <Col md={{size:10,offset:1}}>
      {
        posts && posts.map((post,index)=>(
          <Post post={post} key={index} deletePost={deletePost}/>
        ))
      }
      </Col>
    </Row>
      
      </Container>
    </div>
  )
}

export default UserDashboard