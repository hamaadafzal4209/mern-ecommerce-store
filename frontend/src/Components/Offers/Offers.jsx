import React from 'react'
import "./Offers.css"
import exclusiveImage from "../Assets/exclusive_image.png"

function Offers() {
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>Exclusive <br /> Offers For You</h1>
        <p>ONLY ON BEST SELLER PRODUCTS</p>
        <button>Check Now</button>
      </div>
      <div className="offers-right">
        <img src={exclusiveImage} alt="" />
      </div>
    </div>
  )
}

export default Offers
