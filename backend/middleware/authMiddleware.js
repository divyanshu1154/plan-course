const jwt = require('jsonwebtoken');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.auth = async (req, res, next) => {
    const token = req.cookies.courseToken;
    console.log(token);
    if(!token) res.status(401).send("Not Authorised");
    if(token){
      try {
        const verify = jwt.verify(token,JWT_SECRET);
        req.user = verify;
        next();  
      } catch (error) {
          res.status(400).send(error);
      }
    }

}