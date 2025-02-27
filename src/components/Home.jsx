import img from '../assets/img.jpg'
import Navbar from './Navbar'

const Home = () => {
  return (
    <>
      <Navbar/>
      <div className="flex flex-col justify-center items-center h-[90vh] px-8 text-black font-bold"  style={{backgroundImage:`url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <h1 className="text-4xl mb-4 tracking-wide">Contact Management System</h1>
        <p className="text-xl mb-6">Manage your contacts seamlessly and efficiently with our platform.</p>
      </div>
    </>

  )
}

export default Home