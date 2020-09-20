
## Description

ACME Corp project managment api

This api is built with Node.js + Typescript, and using MongoDB for persistence

## Installation

```bash
# Note: if you run this locally make sure 
# to have MongoDB as well installed

$ yarn install
```
### with docker

```bash
# recommended since it already includes a MongoDB linked docker image

$ docker-compose build
```

## Running the app

```bash
# with docker
# will also start a mongodb instance

$ docker-compose up

# development
$ yarn start

# watch mode
$ yarn start:dev
```

#### App starts at http://localhost:3000


## Swagger documentation
#### Swagger is on: http://localhost:3000/swagger

## Code documentation


```bash
$ yarn start:doc
```
#### Will start a separate documentation page  http://localhost:8080/documentation

#### There is also additional inline documentation in the code

## Test

```bash
# unit tests

$ yarn test
```

