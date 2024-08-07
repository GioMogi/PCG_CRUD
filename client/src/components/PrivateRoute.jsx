import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />
}