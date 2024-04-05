import createConnection from '../index'

async function create() {
  const connection = await createConnection()

  await connection.query(
    `INSERT INTO modules (
    	id,
			name,
      created_at,
      updated_at
    ) values 
      ('5aefe650-10a3-4e0d-a018-4704975d84b6', 'Segurança', 'now()', 'now()'),
			('6a0d2ad5-b167-4fa0-b030-eece875add34', 'Vagas', 'now()', 'now()'),
			('2c25a4d2-c8b4-47e6-abeb-753127a0e9b5', 'Tabelas', 'now()', 'now()')`
  )

  await connection.close()
}

create().then(() => console.log('Menu options table created!'))
