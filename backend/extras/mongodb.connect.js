const mongoose = require("mongoose")

const ConnectDatabase = async (db_url) => {
    try {
        await mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Connected to the MongoDB database');
    }
    catch(error){
        console.error('Error connecting to the database:', error);
    };
}

module.exports = { ConnectDatabase }