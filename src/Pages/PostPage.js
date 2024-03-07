import React, { useContext, useEffect, useState } from 'react'
import Base from '../Components/Base'
import { useNavigate, useParams } from 'react-router-dom'
import { addComment, deleteCommentsById, getPostById } from '../Services/post-service.js';
import { Container, Row, Col, Card, CardBody, CardText, CardImg, Input, Button } from 'reactstrap';
import { BASE_URL } from '../Services/Helper.js';
import {  isLoggedIn, isTimeOut } from '../auth';
import { toast } from 'react-toastify';
import UserContext from '../context/UserContext';
import { Hourglass } from 'react-loader-spinner'

function PostPage() {
    const userContextData = useContext(UserContext)
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);
    const { postId } = useParams()
    const [post, setPost] = useState(null);
    const [comment,setComment]=useState({
        content:''
    })
    useEffect(() => {
        getPostById(postId).then(data => {  
            setPost({...data});
        }).catch((error) => {
               navigate("/posts")
            console.log(error);
        })
    }, [postId])
    const timeout = ()=>{
        userContextData.setUser({
          data:null,
          islogin:false
        })
        navigate("/login")
    }
    const printDate = (num) => {
        return new Date(num).toLocaleString()
    }
    const submitComment =(e)=>{
        e.preventDefault();
        if(!isLoggedIn() || isTimeOut()){
            toast.error('Please login to add comment')
            return;
        }
        if(comment.content.trim()===''){
            return;
        }
        const vardata = {
            content:comment.content,
            addedname:userContextData.user.data.name,
            commentedId:userContextData.user.data.id
        }
        setIsLoading(true);
        addComment(post.postId,vardata).then(data=>{
            setIsLoading(false);
            setPost({
                ...post,
                comments:[...post.comments,data]
            })
            setComment({content:''})
        }).catch((error)=>{
            setIsLoading(false);
            console.log(error)
        })
    }
    const deleteComment=(val)=>{
        if(!isLoggedIn() || isTimeOut()){
            timeout();
            return
          }
        setIsLoading(true);
        deleteCommentsById(val).then(res=>{
            setIsLoading(false);
            getPostById(postId).then(data => {   
                setPost({...data});
            }).catch((error) => {
                console.log(error);
            })
        }).catch((error)=>{
            setIsLoading(false);
            console.log("error",error)
        })
    }
    return (
        <Base>
        {isLoading ? <div className='loadingSpinner'>
                        <Hourglass
                                visible={isLoading}
                                height="50"
                                width="50"
                                ariaLabel="hourglass-loading"
                                colors={['#306cce', '#72a1ed']}
                            /> 
                        </div> :
            <Container>
                <Row>
                
                    <Col md={{ size: 8,offset:2 }}>
                        <Card className='mt-5'>
                            {
                                (post) && (
                                    <CardBody>
                                        <CardText>Posted By <b>{post.user.name}</b> on <b>{printDate(post.addedDate)}</b></CardText>
                                        <CardText>Category title : <b>{post.category.categoryTitle}</b></CardText>
                                        <div><h1>{post.title}</h1></div>
                                        <CardImg alt='image' src={BASE_URL + '/post/image/' + post.imageName}
                                            width="100%">
                                        </CardImg>
                                        <CardText dangerouslySetInnerHTML={{ __html: post.content }} className='mt-3'>
                                        </CardText>
                                    </CardBody>

                                )
                            }

                        </Card>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col md={{
                        size: 8,
                        offset: 2
                    }}>
                        <h4>Comments ({post ? post.comments.length : 0})</h4>
                        {
                            post && post.comments.map((c, index) => (

                                <Card key={index} className='mb-2 border-0'>
                                    <CardBody>
                                    <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                            <div style={{fontSize:10,fontWeight:'bold'}}>{c.addedname}</div>
                                            <div>{c.content}</div>
                                        </div>
                                        <div>
                                        {
                                            userContextData.user.islogin && (c.user && (userContextData.user.data.id===post.user.id || userContextData.user.data.id===c.commentedId)) ? <Button onClick={()=>{deleteComment(c.id)}}>delete</Button>:""
                                        }
                                        </div>
                                    </div>
                                        
                                       

                                       
                                        
                                    </CardBody>
                                </Card>
                            ))
                        }
                        <Card className='border-0'>
                                    <CardBody>
                                        <Input type='textarea' placeholder='Comment Here...'  value={comment.content} onChange={(e)=>setComment({content:e.target.value})}/>
                                        <Button className='mt-2' onClick={submitComment} color='primary'>Submit</Button>
                                    </CardBody>
                                </Card>
                    </Col>
                </Row>
            </Container>
        }
        </Base>

    )
}

export default PostPage