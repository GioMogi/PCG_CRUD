import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center">
        Welcome to Owners and Land Holdings Management
      </h1>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <button onClick={() => navigate("/owners")} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Manage Owners</button>
        <button onClick={() => navigate("/landholdings")} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Manage Land Holdings
        </button>
      </div>
    </div>
  );
}
