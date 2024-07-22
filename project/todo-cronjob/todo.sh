#!/bin/bash

RANDOM_WIKI="https://en.wikipedia.org/wiki/Special:Random"

headers=$(curl -s -I "$RANDOM_WIKI")
WIKI_URL=$(echo "$headers" | grep -i "Location:" | awk '{print $2}' | tr -d '\r')

QUERY="insert into todos (todo) values ('Read ${WIKI_URL}');"

PGPASSWORD=$POSTGRES_PASSWORD psql -h "$POSTGRES_HOST" -p 5432 -U "postgres" -c "$QUERY"