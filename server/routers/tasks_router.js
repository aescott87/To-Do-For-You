const express = require('express');
const tasksRouter = express.Router();
const pool = require('../modules/pool');

//GET request
tasksRouter.get( '/', ( req, res )=>{
    console.log( 'in /tasks GET' );
  
    //SELECT query to our database
    let sqlText = `SELECT * FROM "tasks" ORDER BY "id";`
    pool.query(sqlText)
      .then((result) => {
        console.log('Request successful!');
        res.send(result.rows)
      })
      .catch((error) => {
        console.log('Got an error on SELECT query', error);
        res.sendStatus(500);
      })
})

//POST request
tasksRouter.post('/',  (req, res) => {
    let newTask = req.body;
    console.log(`Adding task`, newTask);
  
    let queryText = `INSERT INTO "tasks" ("task", "due_date")
                     VALUES ($1, $2);`;
    pool.query(queryText, [newTask.task, newTask.due_date] )
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new task`, error);
        res.sendStatus(500);
      });
  });

module.exports = tasksRouter;