const mongoose = require('mongoose');
const dotenv = require('dotenv')

connecDB().catch(err => console.log(err));

async function connecDB() {
  try{
    await mongoose.connect(process.env._MONGO_URL);
    console.log("DB Connected succesful");    
  }
  catch(err){
    console.log(`Error in DB connection as: ${err}`);    
  }
}

module.exports = connecDB
