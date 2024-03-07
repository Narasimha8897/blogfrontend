import React, { useContext, useEffect, useState } from 'react'
import { changePasswordForUser, getCurrentUserDetail, isLoggedIn, isTimeOut } from '../auth';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Hourglass } from 'react-loader-spinner'
import UserContext from '../context/UserContext';

function ChangePassword() {
    const navigate=useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(undefined)
    const userContextData = useContext(UserContext);
    const [oldPassword,setOldPassword]=useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordError, setPasswordError] = useState({
        passwordError: "",
        newPasswordError: "",
        confirmPasswordError: ""
    })
    useEffect(() => {
        setUser(getCurrentUserDetail())
    }, []);
    const timeout = ()=>{
        userContextData.setUser({
          data:null,
          islogin:false
        })
        navigate("/login")
    }
    const submitData = (e) => {
        e.preventDefault();
        if(!isLoggedIn() || isTimeOut()){
            timeout();
            return
          }
        if(oldPassword.trim().length<4 || oldPassword.trim().length>12 ){
            setPasswordError({
                passwordError:"Password must be min of 4 chars and max of 12 chars !!",
            })
            return
        }
        if(newPassword.trim().length<4 || newPassword.trim().length>12){
            setPasswordError({
                newPasswordError:"Password must be min of 4 chars and max of 12 chars !!",
            })
            return
        }
        if(newPassword.trim()!==confirmPassword.trim()){
            setPasswordError({
                confirmPasswordError:"confirm password is not matching with new password !!",
            })
            return
        }
        if(newPassword.trim()===oldPassword.trim()){
            toast.error("Old password cannot be same as new password !!")
            return
        }
        if (newPassword.trim() === confirmPassword.trim()) {
            const userInt ={
                id:user.id,
                password:oldPassword,
                newPassword:newPassword
            }
            setIsLoading(true);
            changePasswordForUser(userInt).then(res=>{
                setIsLoading(false);
                if(res==="invalid"){
                    toast.error("Old Password is incorrect")
                    return
                }
                if(res==="valid"){
                    toast.success("Password Changed Successfully!!")
                    navigate(`/user/profile-info/${user.id}`)
                }

            }).catch((error)=>{
                setIsLoading(false);
                console.log(error);
            })
        }
    }
    const handleReset = () => {
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setPasswordError({
            passwordError: "",
        newPasswordError: "",
        confirmPasswordError: ""
        })
    }
    return (
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
                                <h3>Fill the details to Change Password</h3>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={submitData}>
                                    <FormGroup>
                                        <Label for="password">
                                            Old Password
                                        </Label>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            value={oldPassword}
                                            onChange={(e)=>{setOldPassword(e.target.value)}}
                                            invalid={passwordError.passwordError ? true : false}
                                        />
                                        <FormFeedback>
                                            {passwordError.passwordError}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="newPassword">
                                            New Password
                                        </Label>
                                        <Input
                                            id="newPassword"
                                            name="newPassword"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => { setNewPassword(e.target.value) }}
                                            invalid={passwordError.newPasswordError ? true : false}
                                        />
                                        <FormFeedback>
                                            {passwordError.newPasswordError}
                                        </FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="confirmpassword">
                                            Confirm New Password
                                        </Label>
                                        <Input
                                            id="confirmpassword"
                                            name="confirmpassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => { setConfirmPassword(e.target.value) }}
                                            invalid={passwordError.confirmPasswordError ? true : false}
                                        />
                                        <FormFeedback>
                                            {passwordError.confirmPasswordError}
                                        </FormFeedback>
                                    </FormGroup>
                                    <Container className='text-center'>
                                        <Button color="success" className='me-3' type='submit'>Submit</Button>
                                        <Button color="danger" type='reset' onClick={handleReset} >Reset</Button>
                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>}
            </Container>
        </div>
    )
}

export default ChangePassword