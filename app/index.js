var express = require('express');
var prom = require('prom-client');
const register = prom.register;

var app = express();


const counter = new prom.Counter({
    name: 'aula_request_total',
    help: 'Contador de requests',
    labelNames: ['statusCode']
});

const gauge = new prom.Gauge({
    name: 'aula_free_bytes',
    help: 'Exemplo de Gauge'
});

const histogram = new prom.Histogram({
    name: 'aula_request_time_seconds',
    help: 'Tempo de resposta da API',
    buckets: [0.1, 0.2, 0.3, 0.4, 0.5] 
});

const summary = new prom.Summary({
    name: 'aula_summary_request_time_seconds',
    help: 'Tempo de resposta da API',
    buckets: [0.5, 0.9, 0.99] //50%, 90%, 99%
});

app.get('/', function (req, res) {
    //contando a quantidade de requests
    counter.labels('200').inc();
    counter.labels('300').inc();

    //cria uma metrica do tipo gauge com um valor aleatorio
    gauge.set(100*Math.random());

    const tempo = Math.random();
    //cria uma metrica do tipo histogram e summarycom um valor aleatorio
    histogram.observe(tempo);
    summary.observe(tempo);
    
    res.send('Instrumentando uma app com o Prometheus!');
});

//criando a rota para externalizar o /metrics para o prometheus
app.get('/metrics', async function (req, res) {  
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

//Porta sendo externalizada
app.listen(3000);