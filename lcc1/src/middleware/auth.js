const API_KEY = 'secretapikey123';

function authenticate(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (apiKey && apiKey === API_KEY) {
    next(); // Autenticação bem-sucedida
  } else {
    res.status(401).send('Não autorizado');
  }
}

module.exports = authenticate;
