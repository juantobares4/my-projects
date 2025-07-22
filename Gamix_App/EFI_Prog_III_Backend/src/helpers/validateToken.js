import jwt from 'jsonwebtoken'

export const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const secretKey = process.env.JWT_SECRET;

  if(authHeader){
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, secretKey, (err, payload) => {
      if(err){
        return res.status(403).json({
          success: false,
          message: 'Token inválido',
        
        });
      
      }else{
        req.user = payload;
        next();

      };
    
    });
  
  }else{
    res.status(401).json({
      success: false,
      message: 'El Token no fue proporcionado',
    
    });
  
  };

};