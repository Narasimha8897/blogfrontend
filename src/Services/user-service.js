import { myAxios, privateAxios } from "./Helper.js"

export const signUp = (user) => {
    return myAxios
    .post("/auth/register",user)
    .then((response)=>response.data);

}

export const loginUser = (loginDetail)=>{
    return myAxios.post('/auth/login',loginDetail).then((response)=>
        response.data
    );
}

export const getUser=(userId)=>{
    return myAxios.get(`/users/${userId}`).then(response=>response.data)
}
//update user
export const updateUserDetails=(userDetails,userId)=>{
    return privateAxios.put(`/users/${userId}`,userDetails).then(response=>response.data)
}
//get all users
export const getAllUsers=()=>{
    return privateAxios.get(`/users/`).then(response=>response.data)
}
//delete user
export const deleteUserById=(userId)=>{
    return privateAxios.delete(`/users/${userId}`).then(response=>response.data)
}
