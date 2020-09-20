
## Description

ACME Corp project managment api

## Installation

```bash
$ yarn install
```
### with docker

```bash
$ docker-compose build
```

## Swagger documentation
#### Swagger is on: http://localhost:3000/swagger

## Code documentation


```bash
$ yarn start:doc
```
#### Will start a separate documentation page  http://localhost:8080/documentation

#### There is also additional inline documentation in the code

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

## Test

```bash
# unit tests

$ yarn test
```

