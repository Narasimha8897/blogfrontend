import React, { useState } from 'react'
import Base from '../Components/Base'
import { Card, CardBody, CardHeader, Container,FormGroup,Form,Label,Input, Button, Row, Col, FormFeedback } from 'reactstrap'
import { signUp } from '../Services/user-service.js'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Hourglass } from 'react-loader-spinner'

function Signup() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [data,setData]=useState({
        name:"",
        email:"",
        password:"",
        about:""
    })
    const [confirmPassword,setConfirmPassword]=useState('')
    const [error,setError]  =useState({
        errors:{},
        isError:false
    })
    const handleChange=(e,property)=>{
        setData({...data,[property]:e.target.value})
    }
    const resetData = ()=>{
        setData({
            name:"",
            email:"",
            password:"",
            about:""
        })
        setConfirmPassword('')
        setError({
            errors:{},
            isError:false
        })
        
    }
    const submitData =(e)=>{
        e.preventDefault();
        if(confirmPassword!==data.password){
            toast.error("Confirm password should be same as password!!")
            return
        }
        setIsLoading(true);
        signUp(data).then((res)=>{
            setIsLoading(false);
            if(res==='valid'){
                toast.success("user registered sucessfully !!",res.id);
                navigate("/login")
                setData({
                    name:"",
                    email:"",
                    password:"",
                    about:""
                });
                setError({
                    errors:{},
                    isError:false
                })
                setConfirmPassword('')
            }
            if(res==='invalid'){
                toast.error("user already exists !!");
            }
            
        }).catch((err)=>{
            setIsLoading(false);
            setError({
                errors:err,
                isError:true
            })
        })
    }
    return (
        <Base>
            <div>
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
                <Row>
                    <Col sm={{size:"6",offset:"3"}}>
                    <Card className='my-5'>
                        <CardHeader>
                            <h3>Please fill the details to Register</h3>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={submitData}>
                                <FormGroup>
                                    <Label for="name">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        onChange={(e)=>{handleChange(e,'name')}}
                                        value={data.name}
                                        invalid={error.errors?.response?.data?.name?true:false}
                                    />
                                    <FormFeedback>
                                    {error.errors?.response?.data?.name}
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={(e)=>{handleChange(e,"email")}}
                                        value={data.email}
                                        invalid={error.errors?.response?.data?.email?true:false}
                                    />
                                    <FormFeedback>
                                    {error.errors?.response?.data?.email}
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={(e)=>{handleChange(e,"password")}}
                                        value={data.password}
                                        invalid={error.errors?.response?.data?.password?true:false}
                                    />
                                    <FormFeedback>
                                    {error.errors?.response?.data?.password}
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="confirmpassword">
                                        Confirm Password
                                    </Label>
                                    <Input
                                        id="confirmpassword"
                                        name="confirmpassword"
                                        type="password"
                                        onChange={(e)=>{setConfirmPassword(e.target.value)}}
                                        value={confirmPassword}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="about">
                                        About
                                    </Label>
                                    <Input
                                        id="about"
                                        name="about"
                                        type="textarea"
                                        style={{height:"200px"}}
                                        onChange={(e)=>{handleChange(e,"about")}}
                                        value={data.about}
                                        invalid={error.errors?.response?.data?.about?true:false}
                                    />
                                    <FormFeedback>
                                    {error.errors?.response?.data?.about}
                                    </FormFeedback>
                                </FormGroup>
                                <Container className='text-center'>
                                    <Button  color="success" className='me-3'>Submit</Button>
                                    <Button onClick={resetData} color="warning" type='reset'>Reset</Button>
                                </Container>
                            </Form>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>}
                </Container>

            </div>
        </Base>
    )
}

export default Signup