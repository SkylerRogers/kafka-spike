#!/bin/bash

docker run -it --rm \
    -e KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper-server:2181 \
    bitnami/kafka:latest kafka-topics.sh --list  --zookeeper localhost:2181

docker run -it --rm \
    -e KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper-server:2181 \
    bitnami/kafka:latest kafka-topics.sh --createi --topic test --bootstrap-server kafka:9092 --replication-factor 1 --partitions 1  --zookeeper localhost:2181
