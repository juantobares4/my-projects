import { Navigate } from 'react-router-dom';

import { useStore } from '../context/useStore';
import { getDataFromSessionStorage } from './sessionstorage';

export const ProtectedRoutes = ({ children }) => {
  const { user } = useStore();
  
  if(user.length === 0) return <Navigate to={'/'} />
  else return <>
    {children}
  </>

};