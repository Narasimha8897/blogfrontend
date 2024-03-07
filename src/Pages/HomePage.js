import React, { useContext } from 'react'
import Base from '../Components/Base'
import UserContext from '../context/UserContext'
import img2 from '../images/image2.png'
import img1 from '../images/image1.png'
import arrowimg from '../images/arrowbutton.svg'
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom'

function HomePage() {
  const userContextData = useContext(UserContext)
  return (
    <Base>
<div className='mx-5'>
        <h1>Welcome to Blogs Application <b>{userContextData.user.islogin && userContextData.user.data.name}</b></h1>
        <Carousel>
      <Carousel.Item>
        <img src={img1} className='img-fluid carousel-image' alt='banner' style={{height:480}} />
        <Carousel.Caption>
        <Link className='caption-button' to="/user/dashboard">
        <span className='arrow arrow-btn-bg'>
        <img width="20px" src={arrowimg} alt="arrow" />
        </span>
        <span className='btn-text'>Create Post</span>
        </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={img2} className='img-fluid carousel-image' alt='banner' style={{height:480}}  />
        <Carousel.Caption>
        <Link className='caption-button' to="/user/dashboard">
        <span className='arrow arrow-btn-bg'>
        <img width="20px" src={arrowimg} alt="arrow" />
        </span>
        <span className='btn-text'>Create Post</span>
        </Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
    
    </Base>
    
  )
}

export default HomePage