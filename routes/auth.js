const jwt = require('express-jwt');

const getJwt = (req) => {
  return getCookie('jwt', req.headers.cookie)
  };

const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getJwt,
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getJwt,
    credentialsRequired: false,
  }),
};

function getCookie(name, cookie) {
  const value = `; ${cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

module.exports = auth;
