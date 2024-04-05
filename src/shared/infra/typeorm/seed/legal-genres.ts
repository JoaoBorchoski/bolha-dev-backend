import createConnection from '../index'

async function create() {
  const connection = await createConnection()

  await connection.query(
    `INSERT INTO legal_genres (
      id,
      name,
      created_at,
      updated_at
    ) values 
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', 'Homem', 'now()', 'now()'), 
      ('4b802ed3-b611-4067-8836-bab47b436cc4', 'Mulher', 'now()', 'now()'), 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', 'Neutro', 'now()', 'now()')`
  )

  await connection.close()
}

create().then(() => console.log('Legal Genres table created!'))
