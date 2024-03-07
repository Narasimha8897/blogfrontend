import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardImg, CardText } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn, isTimeOut } from '../auth'
import UserContext from '../context/UserContext.js'
import { BASE_URL } from '../Services/Helper.js'

function Post({post={id:-1,title:"This is default post title",content:"This is default title",},deletePost}) {
    const [user,setUser]=useState(null)
    const userContextData = useContext(UserContext)
    const navigate = useNavigate()
    useEffect(()=>{
        setUser(getCurrentUserDetail())
    },[])
    const timeout = ()=>{
        if(!isLoggedIn() || isTimeOut()){
            userContextData.setUser({
              data:null,
              islogin:false
            })
          }
        navigate("/login")
    }
    var dotStr = '';
    if(post.content.replace( /(<([^>]+)>)/ig, '').trim().length>60){
        dotStr='...'
    }
  return (
    <div>
        <Card className='mt-2'>
        <CardHeader>{post.title}</CardHeader>
            <CardBody>
                <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,60)+dotStr}}>
                 
                </CardText>
                <CardImg className='mb-3 post-image' alt='image' src={BASE_URL + '/post/image/' + post.imageName}
                                            width="100%">
                                        </CardImg>
                <div>
                    <Link className='btn btn-secondary' to={"/posts/"+post.postId}>Read More</Link>
                    {
                        userContextData.user.islogin && (user && user.id===post.user.id) ? <Button color='warning' className='ms-2' tag={Link} onClick={timeout} to={`/user/update-post/${post.postId}`}>Update</Button> : ""
                    }
                    {
                        userContextData.user.islogin && (user && user.id===post.user.id) ? <Button color='danger' className='ms-2' onClick={()=>deletePost(post)}>Delete</Button> : ""
                    }
                    
                </div>
            </CardBody>
        </Card>
    </div>
  )
}

export default Post