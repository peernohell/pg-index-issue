#presentation

This project showcase an issue we have with indexing pg db. 
We use [Timescale DB](https://www.timescale.com/) and try to add an index on a jsonb field "info"
We use docker to start the database. It will be setup by the init script. It will also run the ./generate-csv.js script.

#requirement

* Docker
* NodeJS >12

# install

Execute `./init`

It will generate a CSV data, configure the docker to run the DB and import the CSV

To get a psql access just run `./psql` script


# test

Execute `./test`

it will run an analyse on a query that look for a specific extra->info. So it should use the specific index created on that field but it's not the case.

here is an example of what test script return

```
$ ./test

                                                      QUERY PLAN
-----------------------------------------------------------------------------------------------------------------------
 Result  (cost=0.28..2393.39 rows=2275 width=54)
   ->  Append  (cost=0.28..2364.96 rows=2275 width=161)
         ->  Index Scan using _hyper_3_1_chunk_activities_info on _hyper_3_1_chunk  (cost=0.28..2.50 rows=1 width=143)
               Index Cond: ((extra ->> 'info'::text) = 'ASDFASDF'::text)
         ->  Seq Scan on _hyper_3_2_chunk  (cost=0.00..1.04 rows=1 width=75)
               Filter: ((extra ->> 'info'::text) = 'ASDFASDF'::text)
         ->  Seq Scan on _hyper_3_3_chunk  (cost=0.00..1.01 rows=1 width=60)
               Filter: ((extra ->> 'info'::text) = 'ASDFASDF'::text)
         ->  Seq Scan on _hyper_3_4_chunk  (cost=0.00..1.04 rows=1 width=184)
               Filter: ((extra ->> 'info'::text) = 'ASDFASDF'::text)
         ->  Seq Scan on _hyper_3_5_chunk  (cost=0.00..1.04 rows=1 width=205)
               Filter: ((extra ->> 'info'::text) = 'ASDFASDF'::text)
         ->  Seq Scan on _hyper_3_6_chunk  (cost=0.00..1.06 rows=1 width=123)
               Filter: ((extra ->> 'info'::text) = 'ASDFASDF'::text)
         ->  Seq Scan on _hyper_3_7_chunk  (cost=0.00..1.03 rows=1 width=138)
               Filter: ((extra ->> 'info'::text) = 'ASDFASDF'::text)
...
```

