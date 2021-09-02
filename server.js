// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 5000;
app.listen(port,()=>{
    console.log(`the app running on http://localhost:${port}`);
});

// Initialize all get route with a callback function
app.get('/getProjectData',(req,res)=>{
    res.send(projectData);
});

// Post Route
app.post('/addProjectData',(req,res)=>{
    projectData = req.body;
    console.log(projectData);
});
