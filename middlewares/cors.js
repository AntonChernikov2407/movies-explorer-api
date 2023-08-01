const allowedCors = [
  'http://movie-explorer.chernikov.nomoreparties.sbs',
  'https://movie-explorer.chernikov.nomoreparties.sbs',
  'http://api.movie-explorer.nomoreparties.sbs',
  'https://api.movie-explorer.nomoreparties.sbs',
  'http://localhost:3000',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*');
    const { method } = req;
    const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
    const requestHeaders = req.headers['access-control-request-headers'];
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      res.end();
    }
  }

  next();
};

module.exports = cors;
