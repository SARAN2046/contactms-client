import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from '../assets/img.jpg'
import Validation from './Validation';
import axios from "axios"
import { toast } from "react-toastify";

const Register = () => {

  const [formData, setFormData]= useState({
    name:'',
    email:'',
    password:''
  });

  const [errors,setErrors]= useState({});
  const [serverErrors, setServerErrors] = useState([]);
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

    const errs = Validation(formData);
    setErrors(errs)

    if(!errs.name && !errs.email && !errs.password){
      axios.post("https://contactms-api-blue.vercel.app/contactms/register",formData).then(
        (res)=>{
          if(res.data.success || res.status === 201){
            toast.success("Account Created Successfully",{
              position: 'top-right',
              autoClose: 5000
            })
            setFormData({ name: "", email: "", password: "" });
            navigate('/login')
          }
        }).catch(
        (err)=>{
          if(err.response.data.errors){
            setServerErrors(err.response.data.errors)
          }else{
            console.log(err)
          }
        })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{backgroundImage:`url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              {errors.name && <span className='text-red-600'>{errors.name}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              autoComplete="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              {errors.email && <span className='text-red-600'>{errors.email}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              {errors.password && <span className='text-red-600'>{errors.password}</span>}
          </div>

          {serverErrors.length > 0 && (
            serverErrors.map((error, index) => (
              <p className="text-red-600" key={index}>{error.msg}</p>
            )))
          }

          <button
            type="submit"
            className="w-full mb-4 bg-[#2f6690] text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
          <p className='text-sm text-gray-700'>Already Registered? <Link className='text-blue-500 hover:text-blue-700 underline ml-1' to="/login">LogIn</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
