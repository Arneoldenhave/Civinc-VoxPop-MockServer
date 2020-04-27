import express from "express";
import bodyParser from "body-parser";
import routes from './routes/index';
import Mongoose from './db/Mongoose';
import ScheduleEmitter from './services/ScheduleEmitter'


// itnialize emitters
ScheduleEmitter.start()
const app = express();
const database = new Mongoose();

// Connect to DB;
database.connectBD(5);

// BODY PARSER
app.use(bodyParser.json());


app.use(routes);

// ERROR HANDLING MIDDLEWARE
app.use((err: any, req: any, res: any, next: any) => {

});

//app.on('uncaughtException', () => {  app.close() }) 

//app.on('SIGTERM', () => { app.close() } )

//process.on('uncaughtException', () => server.close())

// SERVER ADDRESS

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
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