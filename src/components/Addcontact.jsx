import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../assets/img.jpg'
import axios from "axios"
import { toast } from "react-toastify";
import { FaAt, FaPhoneFlip, FaRegAddressCard, FaUserPlus } from 'react-icons/fa6';

const Addcontact = () => {
  const [formData, setFormData]= useState({
    name:'',
    email:'',
    phone:'',
    address:''
  });

  const navigate = useNavigate();

  const handleChange= (event)=>{
    const{name,value}= event.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit= (e)=>{
    e.preventDefault();

      axios.post("http://localhost:3000/contactms/add-contact",formData,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }).then(
        (res)=>{
          if(res.data.success || res.status === 201){
            toast.success("Contact Added Successfully",{
              position: 'top-right',
              autoClose: 5000
            })
            setFormData({ name: "", email: "", phone: "", address:"" });
            navigate('/dashboard')
          }
        }).catch((err)=>{
            console.log(err)
          })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{backgroundImage:`url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center gap-4">
            <FaUserPlus className='text-xl'/>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>

          <div className="mb-4 flex items-center gap-4">
            <FaAt className='text-xl'/>
            <input
              type="email"
              name="email"
              value={formData.email}
              autoComplete="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>

          <div className="mb-4 flex items-center gap-4">
            <FaPhoneFlip className='text-xl'/>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="new-password"
              placeholder="Enter Phone Number"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>

          <div className="mb-4 flex items-center gap-4">
            <FaRegAddressCard className='text-xl'/>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              autoComplete="new-password"
              placeholder="Enter your Address"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>

          <button
            type="submit"
            className="w-full mb-4 bg-[#2f6690] text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcontact