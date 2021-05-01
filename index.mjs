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

const insert = async () => {
  const res = await pool.query({
    text:
    `
    INSERT INTO "activities" ("_id", "createdAt", "extra")
    VALUES ($1, $2, $3);
    `,
    values: [r().slice(0, 21), new Date(startingAt + (Date.now() - startingAt * Math.random())), { info: Array.from({ length: (1 + Math.random() * 10 | 0) }).map(r).join(' ') }],
  })
}

let i = 4;
console.log('starting inserting data')
while (i--) {
  await Promise.all(Array.from({ length: 1000 }).map(insert))
  console.log(`iteration ${i}`)
}


await pool.end()