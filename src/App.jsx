import { useEffect, useState } from "react";
import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import Contacts from "./components/Contacts";
import { UserContext } from "./components/Usercontext";
import Addcontact from "./components/Addcontact";
import Editcontact from "./components/Editcontact";
import Logout from "./components/Logout";
import Protectedroutes from "./components/Protectedroutes";
import Nofound from "./components/Nofound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: (
      <Protectedroutes>
        <Logout />
      </Protectedroutes>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Protectedroutes>
        <Dashboard />
      </Protectedroutes>
    ),
    children: [
      {
        index: true,
        element: <Contacts />,
      },
      {
        path: "/dashboard/add-contact",
        element: <Addcontact />,
      },
      {
        path: "/dashboard/edit-contact/:id",
        element: <Editcontact />,
      },
    ],
  },
  {
    path:"*",
    element:<Nofound/>
  }
]);

const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3000/contactms/verify", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
};

export default App;
