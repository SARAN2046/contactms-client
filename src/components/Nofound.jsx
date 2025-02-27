import { Link } from "react-router-dom";

const Nofound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <h1 className="text-2xl">Page Not Found</h1>
      <h1 className="text-2xl">
        <Link to="/" className="text-blue-500 underline">Go Home</Link>
      </h1>
    </div>
  );
};

export default Nofound;
