var express = require('express');
var prom = require('prom-client');
const register = prom.register;

var app = express();


const counter = new prom.Counter({
    name: 'aula_request_total',
    help: 'Contador de requests',
    labelNames: ['statusCode']
})


app.get('/', function (req, res) {
    //contando a quantidade de requests
    counter.labels('200').inc();
    
    res.send('Instrumentando uma app com o Prometheus!');
});

//criando a rota para externalizar o /metrics para o prometheus
app.get('/metrics', async function (req, res) {  
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

//Porta sendo externalizada
app.listen(3000);