const express = require('express');
const koalaRouter = express.Router();

//added static services for server
const pool = require('../modules/pool');

// GET
koalaRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "koalas" ORDER BY "id";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(err => {
        console.log('error getting koalas', err)
        res.sendStatus(500);
    })
})

// POST
koalaRouter.post('/', (req, res) => {
    let newKoala = req.body;

    let queryText = `
        INSERT INTO "koalas" (
        "name", "gender", "age", "ready_to_transfer", "notes" )
        VALUES ($1, $2, $3, $4, $5);
        `
    let values = [newKoala.name, newKoala.gender, newKoala.age, newKoala.ready_to_transfer, newKoala.notes]
    // pool.query(values)
    console.log('Adding new koala', values);
    pool.query(queryText, values)
        .then(result => {
            res.sendStatus(201);
        })
        .catch(err => {
            console.log(`Error in adding koala`, err);
            res.sendStatus(500);
        });
});


// PUT

koalaRouter.put('/:id', (req, res) => {
    let id = req.params.id;
    let content = req.body.transferStatus;

    console.log(id, content);

    let queryText = '';

    if (content === 'true') {
        queryText =
            `UPDATE "koalas"
            SET "ready_to_transfer" = 'FALSE'
            WHERE "id" = $1;
            `
    } else if (content === 'false') {
        queryText =
            `UPDATE "koalas"
            SET "ready_to_transfer" = 'TRUE'
            WHERE "id" = $1;
            `
    }

    pool.query(queryText, [id])
        .then (result =>{
            res.sendStatus(200);
        }).catch (err => {
            console.log('POOL BROKE:', err);
            res.sendStatus(500);
        })
})

// DELETE

module.exports = koalaRouter;