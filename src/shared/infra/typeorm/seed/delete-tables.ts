import createConnection from '../index'

async function create() {
  const connection = await createConnection()

  await connection.query(`truncate migrations`)
  await connection.query(`drop table ceps`)
  await connection.query(`drop table cidades`)
  await connection.query(`drop table estados`)
  await connection.query(`drop table paises`)
  await connection.query(`drop table candidaturas`)
  await connection.query(`drop table vagas`)
  await connection.query(`drop table user_token`)
  await connection.query(`drop table users`)

  await connection.close()
}

create().then(() => console.log('Tables deleted!'))
