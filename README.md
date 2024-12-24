Como executar o prometheus coletando as metricas da app e tambem do servidor - que nesse caso e a maquina host linux

P/ rodar no linux
``` 
docker run --name prometheus --rm -d -p 9090:9090 -v ~/projetos/prometheus_grafana/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
```

P/ rodar no mac
```
docker run --name prometheus --rm -d -p 9090:9090 -v ~/estudos/prometheus_grafana/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
```

Verificar endereço ip
```
ifconfig en0
```

P/ rodar o Grafana no docker
```
docker run -d --name=grafana -p 3000:3000 grafana/grafana-enterprise
```