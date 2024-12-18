Como executar o prometheus coletando as metricas da app e tambem do servidor - que nesse caso e a maquina host linux

``` 
docker run --name prometheus --rm -d -p 9090:9090 -v ~/projetos/prometheus_grafana/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
```
