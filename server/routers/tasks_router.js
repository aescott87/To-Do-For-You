const express = require('express');
const tasksRouter = express.Router();
const pool = require('../modules/pool');

//GET route
tasksRouter.get('/', (req, res) => {
    console.log('in /tasks GET');

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
}) //end GET

//POST route
tasksRouter.post('/', (req, res) => {
    let newTask = req.body;
    console.log(`Adding task`, newTask);

    let queryText = `INSERT INTO "tasks" ("task", "due_date")
                     VALUES ($1, $2);`;
    pool.query(queryText, [newTask.task, newTask.due_date])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(`Error adding new task`, error);
            res.sendStatus(500);
        });
}); //end POST

//PUT route
tasksRouter.put( '/:id', ( req, res )=>{
    console.log( '/tasks PUT:', req.params.id, req.body );
    const query = `UPDATE "tasks" SET "task_complete"=$1 WHERE "id"=$2;`;
    const values =[ req.body.newStatus, req.params.id ];
    pool.query( query, values ).then( (results)=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( 'error with update:', err );
        res.sendStatus( 500 );
    })
}) // end PUT

//DELETE route
tasksRouter.delete( '/:id', ( req, res )=>{
    console.log( '/tasks DELETE hit:', req.params.id );
    const query = `DELETE FROM "tasks" WHERE id=$1;`;
    const values = [ req.params.id ];
    pool.query( query, values ).then( ( response )=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( 'error with DELETE:', err );
        res.sendStatus( 500 );
    })
}) //end DELETE

module.exports = tasksRouter;