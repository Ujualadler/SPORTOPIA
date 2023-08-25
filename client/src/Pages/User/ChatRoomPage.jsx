import React from 'react'
import ChatRoom from '../../Components/Chat/ChatRoom'
import Navbar from '../../Components/User/NavbarUser/NavbarUser'
import Footer from '../../Components/User/Footer/Footer'
import ClubNavbar from '../../Components/User/ClubNavbar/ClubNavbar'

function ChatRoomPage() {

  return (
    <>
    <Navbar/>
    <div className="pt-4  m-1 pb-4 bg-cover text-white bg-center bg-[url(https://media.istockphoto.com/id/1468296537/vector/seamless-camouflaged-black-grunge-textures-wallpaper-background.jpg?s=612x612&w=0&k=20&c=Sc3auzDoYX7wt01KphLYfWqIvtRpyzfjvAB6PPZRK0U=)]">
      <ClubNavbar/>
      <ChatRoom/>
    </div>
    </>
  )
}

export default ChatRoomPage