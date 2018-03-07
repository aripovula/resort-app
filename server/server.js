const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); 

hbs.registerPartials(path.join(__dirname , '../views/partials'))
app.set('view engine', 'hbs');

/*app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});*/

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(path.join(__dirname , '../public')));
io.on('connection',(socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('User is disconnected');
  });  

});



hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Enjoy our resort more with this app - accurate statistics, bookings, schedules, requests and more'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
