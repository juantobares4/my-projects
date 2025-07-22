export const blockedRouteFor = (accessDenied) => {
  return (req, res, next ) => {
    const isDenied = req.user.role === accessDenied ? true : false;
   
    if(isDenied){
      return res.status(405).json({ message: 'Permiso denegado.' });
    
    }else{
      next();
      return true;
    
    };

  };

};
