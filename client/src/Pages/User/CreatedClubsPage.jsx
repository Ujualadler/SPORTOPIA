import React from "react";
import Navbar from "../../Components/User/NavbarUser/NavbarUser";
import CreatedClubs from "../../Components/User/CreatedClub/CreatedClub";
import Footer from "../../Components/User/Footer/Footer";

function CreatedClubsPage() {
  return (
    <>
      <Navbar />
      <div className="pt-4 ml-1 mt-1 pb-4  bg-cover bg-center bg-[url('https://media.istockphoto.com/id/1287665860/vector/modern-3d-black-abstract-tech-background.jpg?s=612x612&w=0&k=20&c=jfj-7hsWU-jId-AblmySe1N47BxamdwPUEssBAULaL8=')]">
        <CreatedClubs />
      </div>
      <Footer />
    </>
  );
}

export default CreatedClubsPage;
