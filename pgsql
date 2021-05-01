#!/bin/bash

source ./env

docker exec -it $DOCKER_NAME psql -U $PGUSER -d "$POSTGRES_DB"
