import React from 'react'
import Navbar from '../../Components/User/NavbarUser/NavbarUser'
import ClubNavbar from '../../Components/User/ClubNavbar/ClubNavbar'
import ClubHome from '../../Components/User/ClubHome/ClubHome'
import Footer from '../../Components/User/Footer/Footer'

function ClubHomePage() {
  return (
    <>
    <Navbar/>
    <div className="pt-4  m-1  pb-4 bg-cover text-white bg-center bg-[url(https://media.istockphoto.com/id/1468296537/vector/seamless-camouflaged-black-grunge-textures-wallpaper-background.jpg?s=612x612&w=0&k=20&c=Sc3auzDoYX7wt01KphLYfWqIvtRpyzfjvAB6PPZRK0U=)]">
      <ClubNavbar/>
      <ClubHome/>
    </div>
    <Footer/>
    </>
  )
}

export default ClubHomePage