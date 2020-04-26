import mongoose from 'mongoose';


const dbPort = 27017;
const dbHost = "localhost"
const appName = 'VoxPop'
const dbUrl   = `mongodb://${dbHost}:${dbPort}`;
mongoose.Promise = global.Promise;


import EventsModel from './../models/Events/EventsModel';

class Mongoose {

  public connectBD(max: number) 
  {
    mongoose.connect(process.env.MONGODB_URI || dbUrl)
    .then(res => console.log(`\n\nConneted to Mongo: ${process.env.MONGODB_URI || dbUrl}}`))
    .catch(err => 
    {
      if (max !== 0) 
      {
        max-- 
        setTimeout(() => {
          this.connectBD(max)
          console.log("Tried to connecto to DB " + max + " time(s)")
        }, 5000)
      } else 
      {
        console.log(err)
      };
    });   
  };
};


export default Mongoose;