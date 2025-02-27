import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./Usercontext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  return (
    <nav className="bg-[#2f6690] text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">
          <Link to="/">CMS</Link>
        </div>

        <div className="space-x-6">
          <Link to="/about" className="hover:text-[#d9dcd6]">
            About
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-[#d9dcd6]">
                Contacts
              </Link>
              <Link to="/register" className="hover:text-[#d9dcd6]">
                {user.name}
              </Link>
              <Link to="/logout" className="hover:text-[#d9dcd6]">
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#d9dcd6]">
                Login
              </Link>
              <Link to="/register" className="hover:text-[#d9dcd6]">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
