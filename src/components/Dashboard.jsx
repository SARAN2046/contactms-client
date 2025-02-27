import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

const Dashboard = () => {
  return (
    <>
      <Navbar/>

      <div className="flex h-[90vh]">
        <div className="flex border overflow-hidden border-r-black w-[20%]">
          <Sidebar/>
        </div>
        <div className="w-[80%] overflow-hidden">
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default Dashboard