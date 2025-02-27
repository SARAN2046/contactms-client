import { Link } from "react-router-dom";
import { FaAddressCard, FaCubesStacked, FaPowerOff, FaRegAddressCard, FaUser } from "react-icons/fa6";
import { useState } from "react";

const Sidebar = () => {
  const [activeLink, setActiveLink]= useState(1)
  return (
    <div className="mt-9 w-full">
      <div className="pl-6 pt-4 pb-4">
        <FaCubesStacked className="text-3xl"/>
      </div>
      <div className={`pl-6 pt-4 pb-4 ${activeLink === 0 ? "bg-[#2f6690]" : ""}`}
      onClick={()=> setActiveLink(0)} >
        <Link className="flex items-center gap-2 " ><FaUser className="text-lg"/> Profile</Link>
      </div>
      <div className={`pl-6 pt-4 pb-4 ${activeLink === 1 ? "bg-[#2f6690]" : ""}`}
      onClick={()=> setActiveLink(1)} >
        <Link className="flex items-center gap-2 " to="/dashboard"><FaAddressCard className="text-lg"/> Contacts</Link>
      </div>
      <div className={`pl-6 pt-4 pb-4 ${activeLink === 2 ? "bg-[#2f6690]" : ""}`}
      onClick={()=> setActiveLink(2)} >
        <Link className="flex items-center gap-2 " to="/dashboard/add-contact"><FaRegAddressCard className="text-lg"/> Add Contact</Link>
      </div>
      <div className={`pl-6 pt-4 pb-4 ${activeLink === 3 ? "bg-[#2f6690]" : ""}`}
      onClick={()=> setActiveLink(3)} >
        <Link to="/logout" className="flex items-center gap-2 " ><FaPowerOff className="text-lg"/> Exit</Link>
      </div>
    </div>
  )
}

export default Sidebar