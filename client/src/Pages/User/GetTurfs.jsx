import React from 'react'
import Booking from '../../Components/User/Booking/Booking'
import Navbar from '../../Components/User/NavbarUser/NavbarUser'
import Footer from '../../Components/User/Footer/Footer'

function GetTurfs() {
  return (
    <>
    <Navbar/>
    <div className="pt-4 m-1 pb-4 bg-cover bg-center bg-[url('https://media.istockphoto.com/id/1287665860/vector/modern-3d-black-abstract-tech-background.jpg?s=612x612&w=0&k=20&c=jfj-7hsWU-jId-AblmySe1N47BxamdwPUEssBAULaL8=')]">
    <Booking/>
    </div>
    <Footer/>
    
    </>
  )
}

export default GetTurfs
