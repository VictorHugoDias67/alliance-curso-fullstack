const express = require('express')
const app = express()
app.use(express.json());
const port = 3000

var listaProdutos = [];
function initMemDB() {
    listaProdutos.push({codigo: 1, quantidade: 10, descricao: 'caneta'});
    listaProdutos.push({codigo: 2, quantidade: 20, descricao: 'borracha'});
    listaProdutos.push({codigo: 3, quantidade: 5, descricao: 'caderno'});
}

app.get('/', (req, res) => {
  res.send('Hello World!')
  res.send('Hello World! ')
})

app.get('/produtos/', (req, res) => {
    res.send(listaProdutos);
})
app.get('/produtos/:codigo', (req, res) => {
    var result = listaProdutos.filter((x) => x.codigo == req.params.codigo);
    if (result.length == 0) {
        res.statusCode = 404
        res.send("")
    }
    else 
        res.send(result[0]);
})

app.delete('/produtos/:codigo', (req, res) => {
    var result = listaProdutos.filter((x) => x.codigo != req.params.codigo);

    if (result.length == listaProdutos.length) {
        res.statusCode = 404
        res.send("NOK"); 
    }
    else { 
        listaProdutos = result;
        res.send("OK");
    }
})


app.put('/produtos/:codigo', (req, res) => {
    var resource = listaProdutos.filter((x) => x.codigo == req.params.codigo);
    var newObj = req.body;
    if (resource.length == 0) {
        res.statusCode = 404
        res.send("NOK"); 
    }
    else {
        var elementoAtual = resource[0];
        if (elementoAtual.codigo != newObj.codigo) {
            var existsNew = listaProdutos.filter((x) => x.codigo == newObj.codigo);
            if (existsNew.length > 0) {
                res.statusCode = 409
                res.send("NOK");
                return;
            } 
        } 

        elementoAtual.codigo = newObj.codigo;
        elementoAtual.descricao = newObj.descricao;
        elementoAtual.quantidade = newObj.quantidade;
        res.send("OK");
    }
})

app.post('/produtos', (req,res) => {
    var newObj = req.body;
    var sameCodigo = listaProdutos.filter(x => x.codigo == newObj.codigo);
    if (sameCodigo.length > 0 ) {
        res.statusCode = 409;
        res.send("NOK");
    } else {
        listaProdutos.push(newObj);
        res.statusCode = 201;
        res.send(newObj);
    }
})



app.listen(port, () => {
  initMemDB();
  console.log(`Example app listening at http://localhost:${port}`)
})