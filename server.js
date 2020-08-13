const express = require('express');
const server = express();
const userRouter = require('./users/userRouter')

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(express.json())
server.use(logger)
server.use('/users', userRouter)

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} from ${req.headers['user-agent']}`
  );

  next();
}

module.exports = server;
