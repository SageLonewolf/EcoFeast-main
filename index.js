// Packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.js");
const adminRouter = require("./routes/admin.js");
const webRouter = require("./routes/web.js")

// Initialize
const app = express();
const PORT = 3000;
const DB = "mongodb+srv://Manas:Food1234@cluster0.xfahjto.mongodb.net/?retryWrites=true&w=majority";

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(authRouter);
app.use(adminRouter);
app.use(webRouter);
//???error still not able to solve /api problem
app.use(express.static('public'));
app.set('view engine', 'ejs');

//Connection
mongoose.connect(DB).then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

app.get('/start', (req, res) => {
    res.json({ hi: 'hello' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log("listening true");
});