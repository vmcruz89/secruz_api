require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const express = require('express');
const { User } = require('./app/models');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/login', (req, res, next) => {
  if(true){//req.body.user === 'luiz' && req.body.password === '123') - ROTINA NO BANCO PRA VERIFICAR AUTENTICACAO
    const id = 1; //esse id viria do banco de dados
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300 // expires in 5min
    });
    return res.json({ auth: true, token: token });
  }
  
  res.status(500).json({message: 'Login inválido!'});
})

app.get('/users', async (req, res) => {
  const user = await User.count();
  res.status(200).send((user).toString());
});
app.post('/users', (req, res) => {
//   const user = await User.create(req.body);
//   res.json(user);
});
app.get('/users/:id', (req, res) => {});
app.put('/users/:id', (req, res) => {});
app.delete('/users/:id', (req, res) => {});

app.listen(3000);
