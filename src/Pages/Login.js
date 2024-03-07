import React, { useContext, useState } from 'react'
import Base from '../Components/Base'
import { Card, CardBody, CardHeader, Container, FormGroup, Form, Label, Input, Button, Row, Col } from 'reactstrap'
import { toast } from 'react-toastify'
import { loginUser } from '../Services/user-service.js'
import { checkCreds, dologin, generateOtpForLogin, getOtpForLogin } from '../auth'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { Hourglass } from 'react-loader-spinner'
function Login() {
    const userContextData = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false);
    const [emailSubmitButton, setEmailSubmitButton] = useState("inline-block")
    const [loginButton, setLoginButton] = useState("none")
    const [resetButton, setResetButton] = useState("inline-block")
    const [otpFieldDisplay, setOtpFieldDisplay] = useState("none")
    const [fieldDisabled, setFieldDisabled] = useState(false)
    const [newOtp, setNewOtp] = useState('')
    const [loginDetails, setLoginDetails] = useState({
        username: "",
        password: ""
    })
    const handleChange = (e, property) => {
        setLoginDetails({ ...loginDetails, [property]: e.target.value });
    }
    const handleReset = () => {
        setLoginDetails({
            username: "",
            password: ""
        })
        setFieldDisabled(false)
    }
    const sendOtp = () => {
        if (loginDetails.username.trim() === '' || loginDetails.password.trim() === '') {
            toast.error("Please Enter the fields");
            return;
        }
        const userInt = {
            email: loginDetails.username
        }
        setIsLoading(true);
        generateOtpForLogin(userInt).then(res => {
            setIsLoading(false);
            toast.success("Otp sent successfully")
        }).catch((error) => {
            setIsLoading(false);
            toast.error("Error in sending otp")
            console.log("Error in sending otp", error)
        })
    }
    const navigate = useNavigate();
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (loginDetails.username.trim() === '' || loginDetails.password.trim() === '') {
            toast.error("Please Enter the fields");
            return;
        }
        setIsLoading(true);
        checkCreds(loginDetails).then(resp => {
            if (resp === "valid") {
                const userInt = {
                    email: loginDetails.username
                }
                generateOtpForLogin(userInt).then(res => {
                    setIsLoading(false);
                    setFieldDisabled(true)
                    setEmailSubmitButton("none")
                    setResetButton("none")
                    setLoginButton("inline-block")
                    setOtpFieldDisplay("block")
                    toast.success("Otp sent successfully")
                }).catch((error) => {
                    toast.error("Error in sending otp")
                    console.log("Error in sending otp", error)
                })
            }
            else {
                setIsLoading(false);
                toast.error("Incorrect Password!!")
            }
        }).catch((error) => {
            console.log("Invalid Credentials", error)
            setIsLoading(false);
            toast.error("Invalid Credentials!!")
        })


    }
    const submitCreds = () => {
        const userIn = {
            email: loginDetails.username
        }
        setIsLoading(true);
        getOtpForLogin(userIn).then(res => {
            setIsLoading(false);
            if (res === 'expired') {
                toast.error("Otp has expired!!")
            }
            if (newOtp === res) {
                setIsLoading(true);
                loginUser(loginDetails).then((data) => {
                    setIsLoading(false);
                    dologin(data, () => {
                        userContextData.setUser({
                            data: data.user,
                            islogin: true
                        })
                    })
                    navigate("/");
                    toast.success("User Loggedin sucessfully!!");
                    setLoginDetails({
                        username: "",
                        password: ""
                    })
                }).catch((error) => {
                    setIsLoading(false);
                    if (error.response.status === 400 || error.response.status === 404) {
                        toast.error(error.response.data.message);
                    }
                    else {
                        toast.error("Something went wrong!!");
                    }

                })
            }
            else {
                setIsLoading(false);
                toast.error("Please enter valid Otp!!")
            }
        }).catch((error) => {
            setIsLoading(false);
            console.log(error)
        })
    }
    return (
        <Base>
            <div>
                {
                    userContextData.user.islogin ? <h1>You are signed in as {userContextData.user.data.name}</h1> :

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
                                    <Col sm={{ size: "6", offset: "3" }}>
                                        <Card className='my-5'>
                                            <CardHeader>
                                                <h3>Please fill the details to Login</h3>
                                            </CardHeader>
                                            <CardBody>
                                                <Form onSubmit={handleFormSubmit}>
                                                    <FormGroup>
                                                        <Label for="email">
                                                            Email
                                                        </Label>
                                                        <Input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            value={loginDetails.username}
                                                            onChange={(e) => { handleChange(e, 'username') }}
                                                            disabled={fieldDisabled}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="password">
                                                            Password
                                                        </Label>
                                                        <Input
                                                            id="password"
                                                            name="password"
                                                            type="password"
                                                            value={loginDetails.password}
                                                            onChange={(e) => { handleChange(e, 'password') }}
                                                            disabled={fieldDisabled}
                                                        />
                                                    </FormGroup>
                                                    <Link className='float-end' to={"/forgot-password"} color='orange'>Forgot Password</Link>
                                                    <FormGroup style={{ display: otpFieldDisplay }}>
                                                        <Label for="otp">
                                                            Enter Otp
                                                        </Label>
                                                        <div className='d-flex justify-content-between'>
                                                            <Input
                                                                id="otp"
                                                                name="otp"
                                                                type="text"
                                                                style={{ width: "50%" }}
                                                                onChange={(e) => { setNewOtp(e.target.value) }}
                                                            />
                                                            <Button color="secondary" onClick={sendOtp}>resend</Button>
                                                        </div>

                                                    </FormGroup>

                                                    <Container className='text-center'>
                                                        <Button color="success" className='me-3' style={{ display: emailSubmitButton }} type='submit'>Submit</Button>
                                                        <Button color="success" className='me-3' style={{ display: loginButton }} onClick={submitCreds}>Login</Button>
                                                        <Button color="danger" type='reset' onClick={handleReset} style={{ display: resetButton }}>Reset</Button>
                                                    </Container>
                                                </Form>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            }
                        </Container>
                }
            </div>
        </Base>

    )
}

export default Login