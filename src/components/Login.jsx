import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from '../assets/img.jpg'
import Validation from './Validation';
import axios from "axios"
import { toast } from "react-toastify";
import { UserContext } from './Usercontext';

const Login = () => {

  const{setUser}= useContext(UserContext)
  const [formData, setFormData]= useState({
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

    if(!errs.email && !errs.password){
      axios.post("https://contactms-api-blue.vercel.app/contactms/login",formData).then(
        (res)=>{
          if(res.data.success || res.status === 201){
            toast.success("Login Successfully",{
              position: 'top-right',
              autoClose: 5000
            })
            localStorage.setItem("token", res.data.token)
            setUser(res.data.user)
            navigate('/dashboard')
          }
        }).catch(
        (err)=>{
          if(err.response.data.errors){
            setServerErrors(err.response.data.errors)
          }else if(err.response.data.msg){
            setServerErrors([{ msg: err.response.data.msg }])
          }else{
            console.log(err)
          }
        })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{backgroundImage:`url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Log in</h2>
        <form onSubmit={handleSubmit}>

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
            Login
          </button>
          <p className='text-sm text-gray-700'>Don&#39;t have an account? <Link className='text-blue-500 hover:text-blue-700 underline ml-1' to="/login">Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
