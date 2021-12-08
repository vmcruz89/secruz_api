const config = require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const express = require('express');
const { User } = require('./app/models');
const bcrypt = require('bcrypt');

express.application.prefix = express.Router.prefix = function(path, configure) {
  var router = express.Router();
  this.use(path, router);
  configure(router);
  return router;
}

const app = express();

app.use(express.urlencoded({ extended: false }));


/* Routes - Begin */
app.get('/', (req, res) => {
  res.send('Oi! Essa é a API do Studio Eraldo Cruz');
}); 
    
app.post('/login', async (req, res, next) => {

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    /* Throw an error if email not exists */
    if (!user) return res.status(422).json({ validation: "User not found" });

    /* Check the password */ 
    let checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.status(422).json({ validation: "Invalid credentials" });

    /* Throw the error if account not verified */
    if (user && !user.verified)
      return res
        .status(400)
        .json({errors: "Your account is not active yet."});

    /* Build authentication payload */
    const payload = {
      user: {
        userId: user.id,
        name: user.name,
        email: user.email,
      },
    };

    const token = jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: 3600 }
    );

    /* Reponse with authentication token */
    res.status(200).json({ token });
  
  } catch (err) {
    res.status(500).json({error: 'Unexpected error'});
  }
})

app.post('/logout', verifyJWT, function(req, res) {
  res.json({ auth: false, token: null });
})

app.prefix("/users", (users) => {
  users.route('/').post(verifyJWT, (req, res) => {
    // ToDo: Implementar cadastro de usuários
    });
  
    users.route('/').get(verifyJWT, async (req, res) => {
    let user = await User.findAll();
    res.status(200).send(user);
  });
  
  users.route('/:id').get(verifyJWT, async (req, res) => {
      let user = await User.findAll({where: {'id': req.params.id}, raw: true})
      res.status(200).send(user);
  });
  
  users.route('/:id').put(verifyJWT, (req, res) => {
    // ToDo: Implementar edição de usuários
  });
  
  users.route('/:id').delete(verifyJWT, (req, res) => {
    // ToDo: Implementar deleção de usuários
  });
});
/* Routes - End */


function verifyJWT(req, res, next){
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    // req.userId = decoded.id;
    next();
  });
}

app.listen(3000);
