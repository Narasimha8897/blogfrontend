import { myAxios, privateAxios } from "./Helper.js"
//add post
export const addPost=(postData)=>{
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`,postData).then(response=>response.data);
}; 
//get all posts
export const loadAllPosts=(pageNumber,pageSize)=>{
    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then(response=>response.data);
}
//get posts by post Id
export const getPostById=(postId)=>{
    return myAxios.get(`/posts/${postId}`).then(response=>response.data);
}

//add comments
export const addComment=(postId,commentData)=>{
    return privateAxios.post(`/post/${postId}/comments`,commentData).then(response=>response.data);
}
//delete comments
export const deleteCommentsById=(commentId)=>{
    return privateAxios.delete(`/comments/${commentId}`).then(response=>response.data)
}
//add image
export const uploadImage=(image,postId)=>{
    let formData = new FormData();
    formData.append("image",image);
    return privateAxios.post(`/post/image/upload/${postId}`,formData,{
        headers:{'Content-Type':'multipart/form-data'}
    }).then(response=>response.data)
}
//delete image
export const deleteImage = (imageName)=>{
    return privateAxios.delete(`/post/deleteImage/${imageName}`).then(response=>response.data);
}
//get posts by category Id
export const getPostsByCategoryId = (categoryId) => {
    return myAxios.get(`/category/${categoryId}/posts`).then(response=>response.data)
}

//get posts by userId
export const getPostsByUser=(userId)=>{
    return myAxios.get(`/user/${userId}/posts`).then(response=>response.data)
}

//delete posts
export const deletePostsById=(postId)=>{
    return privateAxios.delete(`/posts/${postId}`).then(response=>response.data)
}
//update the posts
export const updatePosts=(post,postId)=>{
    return privateAxios.put(`/posts/${postId}`,post).then(response=>response.data)
}


