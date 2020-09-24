const jwt = require('jsonwebtoken');
const config = require('./config');

const utill = {};

// middlewaress
utill.isLoggedin = (req,res,next) => {
  const {token} = req.body;

  if (!token) {
    next();
  }
  else {
    jwt.verify(token, config.jwt_secret, (err, decoded) => {
      if(err) res.json(utill.successFalse(err));
      else {
        req.body.decoded = decoded;
        next();
      }
    });
  }
};

utill.convertDate = date => {
  return date.toISOString().substring(0, 10);
}

module.exports = utill;