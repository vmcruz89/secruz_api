require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const express = require('express');
const { User } = require('./app/models');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Oi! Essa é a API do Studio Eraldo Cruz');
}); 
    
app.post('/login', (req, res, next) => {
  if(req.body.user === 'vini' && req.body.password === '123'){
    const id = 1; //esse id viria do banco de dados
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300 // expires in 5min
    });
    return res.json({ auth: true, token: token });
  }
  
  res.status(500).json({message: 'Login inválido!'});
})

app.post('/logout', verifyJWT, function(req, res) {
  res.json({ auth: false, token: null });
})

app.get('/users', verifyJWT, async (req, res) => {
  // let user = await User.findAll({where: {'id': 33}, raw: true}); //Filtering by User Id
  let user = await User.findAll();
  user = JSON.parse(JSON.stringify(user));
  res.status(200).send((user).toString());
});
app.post('/users', verifyJWT, (req, res) => {
//   const user = await User.create(req.body);
//   res.json(user);
});
app.get('/users/:id', (req, res) => {});
app.put('/users/:id', verifyJWT, (req, res) => {});
app.delete('/users/:id', verifyJWT, (req, res) => {});




function verifyJWT(req, res, next){
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}


app.listen(3000);
