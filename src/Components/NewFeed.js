import React, {  useEffect, useState } from 'react'
import { deleteImage, deletePostsById, loadAllPosts } from '../Services/post-service.js'
import {  Container,  Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import Post from './Post.js'
import { toast } from 'react-toastify'
const NewFeed = () => {
    const [postContent, setPostContent] = useState({
        content: [],
        totalPages: '',
        totalElements: '',
        pageNumber:'',
        pageSize: "",
        lastPage: false
    }
    )
    useEffect(() => {
        loadAllPosts(0,5).then(data => {
            setPostContent(data)
        }).catch((error) => {
            console.log(error);
        })
    }, [])
    const changePage =(pageNumber=0,pageSize=5)=>{
        if(pageNumber>postContent.pageNumber && postContent.lastPage){
            return
        }
        if(pageNumber<postContent.pageNumber && postContent.pageNumber===0){
            return
        }
        loadAllPosts(pageNumber,pageSize).then(data=>{
            setPostContent(data)
            window.scroll(0,0)
        }).catch((error)=>{
            console.log(error)
        })
    }
    function deletePost(post){
        deleteImage(post.imageName).then(res=>{
        }).catch((err)=>{})
        deletePostsById(post.postId).then(res=>{
          toast.success('Post Deleted Successfully !!')
          let newPosts = postContent.content.filter(p=>p.postId!==post.postId)
          setPostContent({...postContent,content:newPosts})
        }).catch(error=>{
          console.log(error)
        })
      }
    return (
        <div>
            <Container>
            <Row>
                <Col md={10}>
                <h4 className='mt-2'>Posts ({postContent.content ? postContent.content.length : 0})</h4>
                </Col>
            </Row>
                <Row>
                    <Col md={{
                        size: 10,
                    }
                    }>

                        {
                            postContent.content.map((post) => (
                                <Post post={post} key={post.postId} deletePost={deletePost}/>
                            )
                            )
                        }
                        <Container className='mt-3'>
                            <Pagination style={{ display: "flex", justifyContent: "center" }}>
                                <PaginationItem disabled={postContent.pageNumber===0} onClick={()=>{changePage(postContent.pageNumber-1)}}>
                                    <PaginationLink previous>
                                        Previous
                                    </PaginationLink>
                                </PaginationItem>
                                {
                                    [...Array(postContent.totalPages)].map((item, index) => (
                                        <PaginationItem onClick={()=>{changePage(index)}} active={index===postContent.pageNumber} key={index}>
                                            <PaginationLink>
                                                {index+1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))
                                }

                                <PaginationItem onClick={()=>{changePage(postContent.pageNumber+1)}} disabled={postContent.lastPage===true}>
                                    <PaginationLink next>
                                            Next
                                    </PaginationLink>
                                </PaginationItem>
                            </Pagination>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default NewFeed