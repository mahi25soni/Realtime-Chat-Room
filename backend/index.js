const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const {ConnectDatabase} = require("../backend/extras/mongodb.connect")
const userRoute = require("./src/admin/user.route")
require('dotenv').config()



const app = express()
app.use(bodyParser.urlencoded  ( {extended:false} ) )
app.use(bodyParser.json());
app.use(cookieParser())


app.use("/", userRoute)

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


