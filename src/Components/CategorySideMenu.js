import React, { useEffect, useState } from 'react'
import {  ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import { loadAllCategories } from '../Services/category-service'

function CategorySideMenu() {
    const [categories,setCategories]=useState([])
    useEffect(()=>{
      loadAllCategories().then(data=>{
        setCategories(data)
      }).catch(error=>{
        console.log(error)
      })
    },[])
  return (
              <ListGroup className='mt-2'>
                <ListGroupItem action={true} tag={Link} to="/posts">
                  All Posts
                </ListGroupItem>
                {
                  categories && categories.map((category,index)=>(
                    <ListGroupItem tag={Link} to={'/categories/'+category.categoryId}  key={index} action={true}>
                      {category.categoryTitle}
                </ListGroupItem>
                  ))
                }
              </ListGroup>
  )
}

export default CategorySideMenu