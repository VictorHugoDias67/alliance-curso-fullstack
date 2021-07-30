const express = require('express');
const cors = require('cors');
const { Pool, types } = require('pg');

const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

const pool = new Pool({
    connectionString: "postgres://postgres:123456@localhost:5432/movimentos"
});

types.setTypeParser(1082, function(value) { //date
    return value;
});

pool.on('connect', () => {
    console.log("Base de dados conectada com sucesso");
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/movimentos', async (req, res) => {
    const result = await pool.query("SELECT * FROM movimentos");
    res.status(200).send(result.rows);
});

app.get('/movimentos/:id', async (req, res) => {
    var result = await pool.query("SELECT * FROM movimentos WHERE id = $1", [req.params.id]);

    if(result.rowCount == 0){
        res.statusCode = 404;
        res.send("");
    }
    else{
        res.status(200).send(result.rows[0]);
    }
});

app.delete('/movimentos/:id', async (req, res) => {
    const result = await pool.query("SELECT id FROM movimentos where id =$1", [req.params.id]);


    if(result.rowCount == 0){
        res.statusCode = 404;
        res.send("NOK");
    }
    else{
        const final = await pool.query("DELETE FROM movimentos WHERE id =$1", [req.params.id]);
        res.send("OK");
    }
});

app.post('/movimentos', async (req, res) => {
    var obj = req.body;
    const text = 'INSERT INTO movimentos(data_mov, descricao, categoria, valor) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [obj.data_mov, obj.descricao, obj.categoria, obj.valor];

    const result = await pool.query(text, values);
    res.status(201).send(result.rows[0]);
});

app.put('/movimentos/:id', async (req, res) => {
    var obj = req.body;
    var filter = await pool.query("SELECT id FROM movimentos WHERE id =$1", [req.params.id]);

    if(filter.rowCount == 0){
        res.statusCode = 404;
        res.send("NOK");
    }
    else{
        const text = "UPDATE movimentos SET data_mov=$1, descricao=$2, categoria=$3, valor=$4 WHERE id= $5";
        const values = [obj.data_mov, obj.descricao, obj.categoria, obj.valor, req.params.id];
        await pool.query(text, values);
        res.status(200).send(obj);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});