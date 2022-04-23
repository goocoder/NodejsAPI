const express = require("express");
const routes = require('./routes/tea');
require('dotenv').config();

const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');

app.use(express.json()); // parses incoming requests with JSON playloads

app.use('/', routes); //to use the routes

app.use('/uploads', express.static('./uploads'));

app.use(helmet());
app.use(compression());

//Index page at default entry route
app.route("/").get(function (req, res) {
    res.sendFile(process.cwd() + "/index.html");
});

  
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port ' + listener.address().port)
})

//establish connection to database
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useUnifiedTopology: true, 
        useNewUrlParser: true
        // server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
        // replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    }, (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB connection -- Ready state is: ", mongoose.connection.readyState);
    }
)