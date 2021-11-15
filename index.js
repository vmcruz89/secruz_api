const config = require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const express = require('express');
const { User } = require('./app/models');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Oi! Essa é a API do Studio Eraldo Cruz');
}); 
    
app.post('/login', async (req, res, next) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    // Check the email
    // If there's not exists
    // Throw the error
    if (!user) return res.status(422).json({ validation: "User not found" });

    // Check the password
    let checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.status(422).json({ validation: "Invalid credentials" });

    // Check user if not activated yet
    // If not activated, send error response
    if (user && !user.verified)
      return res
        .status(400)
        .json({errors: "Your account is not active yet."});

    // If the requirement above pass
    // Lets send the response with JWT token in it
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };

    const token = jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: 3600 }
    );

    res.status(200).json({ token });
  
  } catch (err) {
    res.status(500).json({error: 'Unexpected error'});
  }
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
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}


app.listen(3000);
