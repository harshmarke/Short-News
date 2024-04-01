const mongoose = require("mongoose");
const express = require("express");
const app = express();
const User = require("./model/userSchema");
const dotenv = require("dotenv")
dotenv.config()


app.use(express.json());

// we link the router files to make our router easy
app.use(require('./router/auth'));

const mongoString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@harsh.izodb27.mongodb.net/?retryWrites=true&w=majority&appName=Harsh`


mongoose.connect(mongoString, {useNewUrlParser: true})

mongoose.connection.on("error", function(error) {
  console.log(error);
})

mongoose.connection.on("open", function() {
  console.log("Connected to MongoDB database.");
})



// app.get('/contact', (req,res) => {
//     res.cookie("TEST_cookie","harsh");
//     res.send(`Hello Contact world from the server`);
// })

// app.get('/signin', (req,res) => {
//     res.send(`Hello Login world from the server`);
// })

app.get('/signup', (req,res) => {
    res.send(`Hello Register world from the server`);
})

app.listen(5000, () => {
    console.log(`Server is running at port 5000`);
})