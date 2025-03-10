import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#f4f4f4",
      fontSize: "16px",
      fontWeight: "bold",
    },
  },
  cells: {
    style: {
      fontSize: "14px",
    },
  },
};

const MySwal = withReactContent(Swal);

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const deleteRecord = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://contactms-api-blue.vercel.app/contactms/contacts/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setContacts(res.data.contacts);
            MySwal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch(() => {
            MySwal.fire({
              title: "Error!",
              text: "Error Occured!",
              icon: "error",
            });
          });
      }
    });
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex items-center gap-2">
          <Link to={`/dashboard/edit-contact/${row._id}`}>
            <FaPenToSquare className="text-blue-500 cursor-pointer" />
          </Link>
          <FaRegTrashCan
            className="text-red-500 cursor-pointer"
            onClick={() => deleteRecord(row._id)}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://contactms-api-blue.vercel.app/contactms/contacts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.success || res.status === 201) {
          setContacts(res.data.contacts);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ClimbingBoxLoader
            aria-label="Loading Spinner"
            color="#4fa94d"
            size={15}
          />
        </div>
      ) : (
        <div>
          <DataTable
            columns={columns}
            data={contacts}
            customStyles={customStyles}
            pagination
          />
          {contacts.length === 0 && (
            <h1 className="text-lg flex justify-center items-center">
              Add a Contact
            </h1>
          )}
        </div>
      )}
    </>
  );
};

export default Contacts;
