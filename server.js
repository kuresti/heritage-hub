// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

// import the routing file to handle the default (index) route
var index = require('./server/routes/app')

// ... ADD CODE TO IMPORT ROUTING FILES HERE ...
const peopleRoutes = require('./server/routes/people');
const researchNotesRoutes = require('./server/routes/research-notes');
const documentsRoutes = require('./server/routes/documents');

//Import sequence generator (Added 7/23/25 10:31a)
const sequenceGenerator = require('./server/routes/sequenceGenerator');


// Establish a connection to MongoDB
mongoose.connect('mongodb://localhost:27017/heritage-hub', { useNewUrlParser: true })
.then(() => {
    console.log("Connected to database!");
})
.catch((err) => {
    console.log("Connection failed: " + err);
});

// Create an instance of express
var app = express();


//Middleware
// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

// Tell express to use morgan logger
app.use(logger('dev'));

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});
   

// ...ADD YOUR CODE TO MAP YOUR URL's TO ROUTING FILES HERE ...
app.use('/people', peopleRoutes);
app.use('/research-notes', researchNotesRoutes);
app.use('/documents', documentsRoutes);

// Define a simple ping route to test the server
// This is useful for checking if the server is running
app.get('/ping', (req, res) => {
    res.json({ message: 'pong'});
});

// Tell express to use the specified director as the
// root directory for the website
// This is where the Angular app will be served from
app.use(express.static(path.join(__dirname, 'dist/heritage-hub/browser')));

// Tell express to map the default route ('/') to the index route
// app.use('/', index)

// Tell express to map all other non-defined routes back to the index page
app.get('/*splat', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'dist/heritage-hub/browser')});
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port   
      
  server.listen(port, () => {
  console.log('API running on localhost: ' + port);
  });
    


// server.listen(port, function() {
//     console.log('API running on localhost: ' + port)
// });
