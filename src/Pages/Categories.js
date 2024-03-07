import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Base from '../Components/Base'
import { Col, Container, Row } from 'reactstrap'
import CategorySideMenu from '../Components/CategorySideMenu'
import { deletePostsById, getPostsByCategoryId } from '../Services/post-service.js'
import Post from '../Components/Post'
import { toast } from 'react-toastify'
import { isLoggedIn, isTimeOut } from '../auth/index.js'
import UserContext from '../context/UserContext.js'

function Categories() {
    const {categoryId} = useParams()
    const [posts,setPosts]=useState([])
    const navigate = useNavigate()
    const userContextData = useContext(UserContext);
    useEffect(()=>{
        getPostsByCategoryId(categoryId).then(data=>{
            setPosts([...data]);
        }).catch(error=>{
          navigate("/categories")
            console.log(error);
        })
    },[categoryId])
    const timeout = ()=>{
      userContextData.setUser({
        data:null,
        islogin:false
      })
      navigate("/login")
  }
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
        <Base>
            <Container>
            <Row>
                <Col md={2}>

                </Col>
                <Col md={8}>
                   <h4 className='mt-2'>Posts ({posts ? posts.length : 0})</h4>
                </Col>
            </Row>
          <Row className='mb-3'>
            <Col md={{ size: 2 }}>
              <CategorySideMenu />
            </Col>
            <Col md={{ size: 6 }}>
              {
                posts && posts.map((post,index)=>{
                    return(
                    <Post key={index} post={post} deletePost={deletePost}/>)
              })
              }
            </Col>
          </Row>
        </Container>
        </Base>
  )
}

export default Categories