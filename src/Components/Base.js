import React from 'react'
import CustomNavbar from './CustomNavbar.js'

function Base({title="Welcome to our Website",children}) {
  return (
    <div>
        <div className='container-fluid p-0 m-0'>
        <CustomNavbar />
        {children}
        </div>
    </div>
  )
}

export default Base