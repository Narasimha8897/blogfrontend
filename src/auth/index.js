
import { myAxios } from "../Services/Helper";

//isLoggedIn
export const isLoggedIn=()=>{
    let data = localStorage.getItem("data");
    if(data!=null){
        return true;
    }
    else
    {
        return false;
    }
};

//dologin =>data set to local storage
export const dologin=(data,next)=>{
    // const vardata = {
    //     token:data.token,
    //     userId:data.user.id
    // }
    localStorage.setItem("data",JSON.stringify(data))
    localStorage.setItem("loggedTime",JSON.stringify(new Date().toLocaleString("en-US")))
    next();
};
export const isTimeOut=()=>{
    const loggedTime = new Date(JSON.parse(localStorage.getItem("loggedTime")));
    const currTime = new Date();
    if((currTime-loggedTime)>=18000000){
        localStorage.removeItem("data");
        localStorage.removeItem("loggedTime");
        return true;
    }
    else {
        return false;
    }
}
//dologout => remove data from local storage
export const doLogout = (next)=>{
    localStorage.removeItem("data");
    localStorage.removeItem("loggedTime");
    next();
}
//get current user
export const getCurrentUserDetail=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).user;
    }
    else {
        return undefined;
    }
}
//get token
export const getToken=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem('data')).token;
    }
    else{
        return null;
    }
}
//check creds
export const checkCreds=(loginDetail)=>{
    return myAxios.post("/auth/checkcredentials",loginDetail).then(response=>response.data);
}
//generate Otp for login
export const generateOtpForLogin=(userInt)=>{
    return myAxios.post("/auth/generatetoken",userInt).then(response=>response.data);
}
//get Otp for Verification
export const getOtpForLogin=(userIn)=>{
    return myAxios.post("/auth/generatedOtp",userIn).then(response=>response.data);
}

// generate otp to resest password
export const generateOtpForPasswordReset=(userInt)=>{
    return myAxios.post("/auth/resetPassword",userInt).then(response=>response.data);
}
// get Otp for Password Reset
export const getOtpForPasswordReset=(userInt)=>{
    return myAxios.post("/auth/getPasswordOtp",userInt).then(response=>response.data);
}
//save password
export const savePasswordForUser=(userInt)=>{
    return myAxios.post("/auth/savePassword",userInt).then(response=>response.data);
}
// generate otp to change password
export const changePasswordForUser=(userInt)=>{
    return myAxios.post("/auth/changePassword",userInt).then(response=>response.data);
}
