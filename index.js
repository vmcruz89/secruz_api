const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', (req, res) => {});
app.post('/users', (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});
app.get('/users/:id', (req, res) => {});
app.put('/users/:id', (req, res) => {});
app.delete('/users/:id', (req, res) => {});

app.listen(3000);
