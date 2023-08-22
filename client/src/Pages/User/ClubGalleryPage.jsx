import React from "react";
import ClubNavbar from "../../Components/User/ClubNavbar/ClubNavbar";
import ClubGallery from "../../Components/User/Clubgallery/ClubGallery";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";

function ClubGalleryPage() {
  return (
    <>
      <Navbar />
      <div className="pt-4 ml-1 mt-1  pb-4 bg-cover text-white bg-center bg-[url(https://media.istockphoto.com/id/1468296537/vector/seamless-camouflaged-black-grunge-textures-wallpaper-background.jpg?s=612x612&w=0&k=20&c=Sc3auzDoYX7wt01KphLYfWqIvtRpyzfjvAB6PPZRK0U=)]">
        <ClubNavbar />
        <ClubGallery />
      </div>
    </>
  );
}

export default ClubGalleryPage;
