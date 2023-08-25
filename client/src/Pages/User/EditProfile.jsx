import React from 'react'
import ProfileEdit from '../../Components/User/ProfileEdit/ProfileEdit'
import Navbar from '../../Components/User/NavbarUser/NavbarUser'

function EditProfile() {
  return (
    <>
    <Navbar/>
    <div className="m-1  bg-cover bg-center bg-[url('https://media.istockphoto.com/id/1287665860/vector/modern-3d-black-abstract-tech-background.jpg?s=612x612&w=0&k=20&c=jfj-7hsWU-jId-AblmySe1N47BxamdwPUEssBAULaL8=')]">
    <ProfileEdit/>
    </div>
    </>
  )
}

export default EditProfile