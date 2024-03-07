import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { getPostById, updatePosts, uploadImage } from '../Services/post-service.js';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import JoditEditor from 'jodit-react';
import { loadAllCategories } from '../Services/category-service.js';
import { Hourglass } from 'react-loader-spinner'
import { isLoggedIn, isTimeOut } from '../auth/index.js';


function UpdatePost() {
  const editor = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([])
  const { blogId } = useParams()
  const [post, setPost] = useState(null)
  const [image,setImage]=useState(null)
  const userContextData = useContext(UserContext);
  const navigate = useNavigate()
  const [error, setError] = useState({
    title: "",
    content: "",
    category: ""
  })
  useEffect(() => {
    loadAllCategories().then((data) => {
      setCategories(data);
    }).catch(error => {
      console.log("Error in loading categories",error)
    })
    getPostById(blogId).then(data => {
      console.log(data)
      setPost({ ...data, categoryId: data.category.categoryId })

    }).catch(error => {
      navigate("/user/update-post")
      console.log("Error in loading post",error)
    })
  }, [blogId,navigate])
  useEffect(() => {
    if (post) {
      if (post.user.id !== userContextData.user.data.id) {
        toast.error("This is not your post")
        navigate('/feed')
      }
    }
  }, [post,navigate,userContextData.user.data.id])
  
  const timeout = ()=>{
      userContextData.setUser({
        data:null,
        islogin:false
      })
      navigate("/login")
  }
  const handleChange = (e, filedName) => {
    if(!isLoggedIn() || isTimeOut()){
      timeout();
      return
    }
    setPost({
      ...post,
      [filedName]: e.target.value
    })

  }
  const handleFileChange=(e)=>{
    if(!isLoggedIn() || isTimeOut()){
      timeout();
      return
    }
      setImage(e.target.files[0])
    
  }
  const updatedData = (e) => {
    e.preventDefault();
    if(!isLoggedIn() || isTimeOut()){
      timeout();
      return
    }
    if (post.title.trim().length < 4) {
      setError({ title: 'Title must be minimum of 4 characters !!' })
      return
    }

    if (post.content.replace( /(<([^>]+)>)/ig, '').trim().length<10) {
      document.getElementById('jodit-editor').style.border = '1px solid red';
      setError({ content: 'content must be minimum of 10 characters !!' });
      document.getElementById('contentError').style.display = 'block';
      return
    }
    if (post.categoryId ==='') {
      setError({ category: 'Please Select Valid Category' })
      return
    }
    document.getElementById('contentError').style.display = 'none';
    document.getElementById('jodit-editor').style.border = '0px solid #dadada';
    setError({
      title: "",
      content: "",
      category: ""
    })
    if(image!=null && !image.type.startsWith('image/')){
      toast.error("Please select image file only");
        return;
    }
    setIsLoading(true);
    updatePosts({ ...post, category: { categoryId: post.categoryId } }, post.postId)
      .then(res => {
        setIsLoading(false);
        if(image!=null){
          uploadImage(image,post.postId).then(res=>{
            toast.success("Image uplaoded sucessfully")
          }).catch((error)=>{
            toast.error("Error in uploading file");
          })
        }
        toast.success("post updated sucessfully")
        navigate('/feed')
      }).catch(error => {
        setIsLoading(false);
        console.log(error)
        toast.error("Error in updating the post !!")
      })
  }
  const resetData =()=>{
    setPost({ ...post, title:"",content:"",categoryId:'' })
  }
  return (
   
    <Container>
    {isLoading ? <div className='loadingSpinner'>
                        <Hourglass
                                visible={isLoading}
                                height="50"
                                width="50"
                                ariaLabel="hourglass-loading"
                                colors={['#306cce', '#72a1ed']}
                            /> 
                        </div> :
      <div className='wrapper'>
        {
          post && (
            <Row>
              <Col md={{ size: "10", offset: "1" }}>
                <Card className='my-5'>
                  <CardHeader>
                    <h3>Update the Post</h3>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={updatedData}>
                      <FormGroup>
                        <Label for="title">
                          Post Title
                        </Label>
                        <Input
                          id="title"
                          name="title"
                          type="text"
                          value={post.title}
                          onChange={(e) => { handleChange(e, 'title') }}
                          invalid={error.title ? true : false}
                        />
                        <FormFeedback>
                          {error.title}
                        </FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label for="content">
                          Post Content
                        </Label>
                        <div id='jodit-editor'>

                          <JoditEditor
                            ref={editor}
                            name="content"
                            value={post.content}
                            onChange={newContent => setPost({ ...post, content: newContent })}
                          />
                        </div>
                        <FormFeedback id='contentError'>
                          {error.content}
                        </FormFeedback>

                      </FormGroup>
                      <FormGroup>
                        <Label for="image">
                          Post Image
                        </Label>
                        <Input
                          id="image"
                          name="image"
                          type="file"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="category">
                          Post Category
                        </Label>
                        <Input
                          id="category"
                          type="select"
                          name="categoryId"
                          value={post.categoryId}
                          onChange={(e) => { handleChange(e, 'categoryId') }}
                          invalid={error.category ? true : false}
                        >
                          <option value="" disabled>
                            --Select Category--
                          </option>
                          {
                            categories.map((category) => (
                              <option value={category.categoryId} key={category.categoryId} >
                                {category.categoryTitle}
                              </option>
                            ))
                          }
                        </Input>
                        <FormFeedback>
                          {error.category}
                        </FormFeedback>
                      </FormGroup>
                      <Container className='text-center'>
                        <Button type='submit' color="success" className='me-3'>Update Post</Button>
                        <Button color="danger" type='reset' onClick={resetData}>Reset Content</Button>
                      </Container>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )
        }

      </div>
    }
    </Container>

  )
}

export default UpdatePost