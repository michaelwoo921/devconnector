const mongoose = require('mongoose');



async function connectDB(){
    try{
        const db = process.env.mongoURI;
        await mongoose.connect(db);
        console.log('connected to DB')

    }catch(err){
        console.log('failed to connect to db', err)
        process.exit(1);
    }
}

module.exports = connectDB;