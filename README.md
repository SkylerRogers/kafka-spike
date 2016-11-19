# Kafka SPIKE
## Setup
* `$ npm install`
* `$ brew install zookeeper kafka`
* `$ brew services start zookeeper`
* `$ brew services start kafka`

## Usage
* `$ node produce -m yo -p 1`
* `$ node consume -p 1`
