import React from 'react'
import Navbar from '../../Components/User/NavbarUser/NavbarUser'
import UserHome from '../../Components/User/Home/userHome'
import Carousal from '../../Components/Utilities/Carousal'
import Footer from '../../Components/User/Footer/Footer'

function HomePage() {
  return (
    <>
    <Navbar/>
    <UserHome/>
    <Footer/>
    </>
  )
}

export default HomePage