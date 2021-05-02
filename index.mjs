import pkg from 'pg';

const { Pool, Client } = pkg;


const startingAt = 1617295965618;

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'pg_index_issue',
  password: 'postgres',
  port: 5433,
})
// console.log({ 
//   PGUSER: process.env.PGUSER,
//   PGDATABASE: process.env.PGDATABASE,
//   PGPASSWORD: process.env.PGPASSWORD,
// })
const r = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const insert = text => pool.query({ text });

let createdAt = startingAt
const buildInsert = () => {
  const id = r().slice(0, 21);
  createdAt += 10_000;
  const info = Array.from({ length: (1 + Math.random() * 10 | 0) }).map(r).join(' ')

  return `
  INSERT INTO "activities" ("_id", "createdAt", "info", "extra")
  VALUES ('${id}', to_timestamp(${createdAt / 1000 | 0}), '${info}', '{"info": ${JSON.stringify({ info })} }');
  `
}

const buildXInsert = length => Array.from({ length }).map(buildInsert).join('\n');

let i = 4;
console.log('starting inserting data')
while (i--) {
  // await Promise.all(Array.from({ length: 1000 }).map(buildInsert).map(insert))
  // await insert(buildXInsert(1000))
  await Promise.all(Array.from({ length: 10 }).map(() => buildXInsert(1000)).map(insert))
  console.log(`iteration ${i}`)
}


await pool.end()