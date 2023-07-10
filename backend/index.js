const express = require("express")
const bodyParser = require("body-parser")
const {ConnectDatabase} = require("../backend/extras/mongodb.connect")
require('dotenv').config()



const app = express()
app.use(bodyParser.urlencoded  ( {extended:false} ) )
app.use(bodyParser.json());


app.get("/", (req, res)=> {
    res.send("home page hai sir ye toh")
} )

const starting_up = async () => {
    try {
        await ConnectDatabase(process.env.DATABASE_URL)
        app.listen(5000, ()=> {
            console.log("you are connected you 5000 port")
        })
    }
    catch(e){
        console.log(e)
        res.send("There is some error while connecting to the database...")
    }
}

starting_up()


