import React from 'react'
import TurfNavbar from '../../Components/TurfAdmin/TurfNavbar/TurfNavbar'
import TurfListing from '../../Components/TurfAdmin/TurfListing/TurfListing'

function TurfsListing() {
  return (
    <>
    <TurfNavbar/>
    <div className='ml-4 md:ml-12 mt-7  text-xl font-bold trackinge-wide'>REGISTERED TURFS</div>
    <TurfListing/>
    </>
  )
}

export default TurfsListing