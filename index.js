const express = require('express');
const router = express.Router();

const app = express();
const server = require('http').createServer(app);


// BODY PARSER
app.use(bodyParser.json());

app.use(require('./routes'));

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  handleError(err, res);
});

server.on('uncaughtException',() => {  server.close() }) 

server.on('SIGTERM', () => { server.close() } )

process.on('uncaughtException', () => server.close())

// SERVER ADDRESS
const PORT = process.env.PORT || 2000;

server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
};

process.on('uncaughtException', function (err) {
  console.log(err);
}); 