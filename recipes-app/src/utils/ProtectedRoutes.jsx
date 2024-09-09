import { Navigate } from 'react-router-dom';

import { useStore } from '../context/useStore';
import { getDataFromSessionStorage } from './sessionstorage';

export const ProtectedRoutes = ({ children }) => {
  let currentSession = getDataFromSessionStorage('currentUser');
  const { user } = useStore();
  
  if(!user && !currentSession?.id) return <Navigate to={'/'} />
  else return <>
    {children}
  </>

};