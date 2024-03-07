import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { getCategoryByCategoryId, updateCategoryById } from '../Services/category-service'
import { toast } from 'react-toastify'
import UserContext from '../context/UserContext'
import { isLoggedIn, isTimeOut } from '../auth'

function UpdateCategory() {
    const navigate = useNavigate()
    const catId = useParams()
    const [category,setCategory] = useState({})
    const userContextData = useContext(UserContext);
    const [error,setError]=useState({
        title:"",
        description:""
    })
    useEffect(()=>{
        getCategoryByCategoryId(catId.categoryId).then(res=>{
            setCategory({...res})
        }).catch((error)=>{
            navigate("/user/update-category")
            console.log(error)
        })
    },[catId.categoryId])
    const timeout = ()=>{
        userContextData.setUser({
          data:null,
          islogin:false
        })
        navigate("/login")
    }
    const handleChange=(e,property)=>{
        setCategory({ ...category, [property]: e.target.value });
    }
    const submitData=(e)=>{
        e.preventDefault()
        if(!isLoggedIn() || isTimeOut()){
            timeout();
            return
          }
        if(category.categoryTitle.trim().length<4){
            setError({title:"Title must contain min of 4 characters !!"})
            return
        }
        if(category.categoryDescription.trim().length<10){
            setError({description:"Description must be min of 10 characters !!"})
            return
        }
        updateCategoryById(catId.categoryId,category).then(res=>{
            setCategory({...res})
            toast.success("Category updated Successfully!!")
            navigate('/user/category-dashboard')
        }).catch((error)=>{
            console.log(error)
        })
    }
    const resetData=()=>{
        setCategory({...category,categoryTitle:"",categoryDescription:""})
        setError({
            title:"",
            description:""
        })
    }
    return (
        <div>
            <Container>
                <Row>
                    <Col md={{ size: 6, offset: 3 }}>
                        <Card className='my-5'>
                            <CardHeader>
                            <h3>Update Category</h3>
                            </CardHeader>
                            <CardBody>
                                <Form className='my-3' onSubmit={submitData}>
                                    <FormGroup>
                                        <Label for="categoryTitle">Category Title</Label>
                                        <Input
                                            id="categoryTitle"
                                            name="categoryTitle"
                                            type="text"
                                            value={category.categoryTitle}
                                            onChange={(e) => { handleChange(e, 'categoryTitle') }}
                                            invalid={error.title ? true : false}
                                        />
                                        <FormFeedback>
                                            {error.title}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="categoryDescription">Category Description</Label>
                                        <Input
                                            id="categoryDescription"
                                            name="categoryDescription"
                                            type="text"

                                            value={category.categoryDescription}
                                            onChange={(e) => { handleChange(e, 'categoryDescription') }}
                                            invalid={error.description ? true : false}
                                        />
                                        <FormFeedback>
                                            {error.description}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Container className='text-center'>
                                            <Button color='success' className='me-2'>UPDATE</Button>
                                            <Button color='danger' onClick={resetData}>RESET</Button>
                                        </Container>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UpdateCategory