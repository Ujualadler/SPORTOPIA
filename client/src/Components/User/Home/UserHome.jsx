import React from 'react'
import Carousal from '../../Utilities/Carousal'
import { Link } from 'react-router-dom'
import { dummySlides } from '../../../utils/dummy'

function UserHome() {
  return (
    <>
    <div className='flex justify-between'>
    <div className="md:text-xl text-black font-bold md:tracking-[6px] ml-8 mt-5">FOR ALL SPORTS LOVERS</div>
    <div className="md:text-xl text-black font-semibold md:tracking-[6px] mr-8 mt-5  hover:text-gray-200"><Link to='/turf/login'>LOGIN AS TURF ADMIN</Link></div>
    </div>
    <Carousal slides={dummySlides}/>
 
  

    
    </>
  )
}

export default UserHome