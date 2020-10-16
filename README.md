# Kafka SPIKE

## Setup 

* `$ docker compose up -d`

### Create Topic/Partition

* `$ docker-compose exec broker kafka-topics --create --topic test --bootstrap-server broker:9092 --replication-factor 1 --partitions 1`

### Test Topic

* `$ kafka-console-consumer --topic test --bootstrap-server broker:9092`

## Install dependencies

* `$ npm install`

## Usage
* `$ node produce -m yo -p 1`
* `$ node consume -p 1`

## Alternative: Setup using brew

* `$ brew install zookeeper kafka`
* `$ brew services start zookeeper`
* `$ brew services start kafka`
