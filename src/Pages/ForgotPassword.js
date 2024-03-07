import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import Base from '../Components/Base'
import { generateOtpForPasswordReset, getOtpForPasswordReset, savePasswordForUser } from '../auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { Hourglass } from 'react-loader-spinner'

function ForgotPassword() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [details,setDetails]=useState({
        email:""
    })
    const[password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [newOtp,setNewOtp]=useState('')
    const [emailSubmitButton,setEmailSubmitButton]=useState("inline-block")
    const [otpfield,setOtpField]=useState("none")
    const [passwordfield,setPasswordfield]=useState("none")
    const [passwordSubmitButton,setPasswordSubmitButton]=useState("none")
    const [fieldDisabled,setFieldDisabled]=useState(false)
    const [otpSubmitButton,setOtpSubmitButton]=useState("none")
    const [passwordError,setPasswordError]=useState({
        error:"",
        isError:false
    })
    const submitOtp=(e)=>{
        if(newOtp.trim()===''){
            toast.error("Please enter valid OTP")
            return
        }
        setIsLoading(true);
        getOtpForPasswordReset(details).then(res=>{
            setIsLoading(false);
            if(res===newOtp){
                setOtpField("none")
                setPasswordfield("block")
                setOtpSubmitButton("none")
                setPasswordSubmitButton("inline-block")
            }
            if(res==="expired"){
                toast.error("OTP has been expired!!")
                return
            }
        }).catch((error)=>{
            setIsLoading(false);
            console.log(error)
        })
    }
    const submitEmail =()=>{
        if(details.email.trim()===''){
            toast.error("Enter valid Email Address!!")
            return
        }
        setIsLoading(true);
        generateOtpForPasswordReset(details).then(res=>{
            setIsLoading(false);
            if(res==="invaliduser"){
                toast.error("User not found!!")
            }
            if(res==="valid"){
                setFieldDisabled(true)
                setOtpField("block")
                toast.success("OTP Sent Successfully!!")
                setEmailSubmitButton("none")
                setOtpSubmitButton("inline-block")
            }
        }).catch((error)=>{
            setIsLoading(false);
            console.log(error)
        })
    }
    const sendOtp=()=>{
        setIsLoading(true);
        generateOtpForPasswordReset(details).then(res=>{
            setIsLoading(false);
            if(res==="invaliduser"){
                toast.error("User not found!!")
            }
            if(res==="valid"){
                toast.success("OTP Sent Successfully!!")
            }
        }).catch((error)=>{
            setIsLoading(false);
            console.log(error)
        })
    }
    const submitPassword=()=>{
        const userInt = {
            email:details.email,
            password:password
        }
        if(password.trim().length<4 || password.trim().length>12){
            setPasswordError({
                error:"Password must be min of 4 chars and max of 12 chars !!",
                isError:true
            })
            return
        }
        if(password.trim()!==confirmPassword.trim()){
            toast.error("Confirm Password is not matching with password!!")
            return
        }
        if(password.trim()===confirmPassword){
            setIsLoading(true);
            savePasswordForUser(userInt).then(res=>{
                setIsLoading(false);
                if(res==="valid"){
                    toast.success("Password Reset Successfull!!")
                    navigate("/login")
                }
                else{
                    toast.error("Something went wrong")
                    navigate("/forgot-password")
                }
            }).catch((error)=>{
                setIsLoading(false);
                console.log(error)
            })
        }
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
                        <Col sm={{ size: "6", offset: "3" }}>
                            <Card className='my-5'>
                                <CardHeader>
                                <h3>Please fill the details to Reset Password</h3>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <FormGroup>
                                            <Label for="email">
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={details.email}
                                                onChange={(e) => { setDetails({email:e.target.value})}}
                                                disabled={fieldDisabled}
                                            />
                                        </FormGroup>
                                        <FormGroup style={{display:otpfield}}>
                                            <Label for="otp">
                                                Enter Otp
                                            </Label>
                                            <div className='d-flex justify-content-between'>
                                            <Input
                                                id="otp"
                                                name="otp"
                                                type="text"
                                                style={{width:"50%"}}
                                                onChange={(e)=>{setNewOtp(e.target.value)}}
                                            />
                                            <Button color="secondary" onClick={sendOtp}>resend</Button>
                                            </div>
                                        </FormGroup>
                                        <FormGroup style={{display:passwordfield}}>
                                            <Label for="password">
                                                Password
                                            </Label>
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                value={password}
                                                onChange={(e) => {setPassword(e.target.value)}}
                                                invalid={passwordError.isError}
                                            />
                                            <FormFeedback>
                                            {passwordError.error}
                                        </FormFeedback>
                                        </FormGroup>
                                        
                                        <FormGroup style={{display:passwordfield}}>
                                            <Label for="confirmPassword">
                                            Confirm Password
                                            </Label>
                                            <Input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => {setConfirmPassword(e.target.value)}}

                                            />
                                        </FormGroup>
                                        <div className='text-center'>
                                            <Button color='success' onClick={submitEmail} style={{display:emailSubmitButton}}>submit</Button>
                                            <Button color='success' onClick={submitOtp} style={{display:otpSubmitButton}}>submit</Button>
                                            <Button color='success' onClick={submitPassword} style={{display:passwordSubmitButton}}>submit</Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                }
                </Container>
            </div>
        </Base>

    )
}

export default ForgotPassword