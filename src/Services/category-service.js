import { myAxios, privateAxios } from "./Helper.js"
//get all categories
export const loadAllCategories=()=>{
    return myAxios.get('/categories/').then((response)=>{return response.data});
}
//add a category
export const addNewCategory=(categoryDto)=>{
    return privateAxios.post("/categories/",categoryDto).then(response=>response.data)
}
//delete a category
export const deleteCategoryById=(categoryId)=>{
    return privateAxios.delete(`/categories/${categoryId}`).then(response=>response.data)
}

//update a category
export const updateCategoryById=(categoryId,category)=>{
    return privateAxios.put(`/categories/${categoryId}`,category).then(response=>response.data)
}
//check category is exits or not
export const checkCategory=(catTitle)=>{
    return privateAxios.post(`/categories/categoryTitle`,catTitle).then(response=>response.data)
}

//get category by categoryId
export const getCategoryByCategoryId=(categoryId)=>{
    return privateAxios.get(`/categories/${categoryId}`).then(response=>response.data)
}