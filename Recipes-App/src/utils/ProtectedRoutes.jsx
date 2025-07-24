import { Navigate } from 'react-router-dom';
import { useStore } from '../context/useStore';

export const ProtectedRoutes = ({ children }) => {
  const { user } = useStore();

  if (!user) return <Navigate to='/' />;
  return <>{children}</>;

};
