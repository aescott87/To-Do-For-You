//setup
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const tasksRouter = require('./routers/tasks_router.js')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTE
app.use('/tasks', tasksRouter)

// Establish port connection
app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });