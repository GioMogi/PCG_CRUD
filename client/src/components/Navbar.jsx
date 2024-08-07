import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const navigate = useNavigate();
  const { user,logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 p-4 sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/home" className="hover:text-gray-300 font-bold">Home</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/owners" className="text-white hover:text-gray-300 font-bold">
            Owners
          </Link>
          <Link to="/landholdings" className="text-white hover:text-gray-300 font-bold">
            Land Holdings
          </Link>
          {user ? (
            <button onClick={handleLogout} className="text-white hover:text-gray-300 font-bold">Logout</button>
          ) : (
            <Link to="/" className="text-white hover:text-gray-300">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
