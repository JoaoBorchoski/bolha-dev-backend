import createConnection from '../index'

async function create() {
  const connection = await createConnection()

  await connection.query(
    `INSERT INTO genres (
      id,
      legal_genre_id,
      name,
      created_at,
      updated_at
    ) values 
      ('6787d29b-792e-44f4-80ca-7f22409861fa', 'd79db0a2-5e8c-4fe6-81e0-5418cfa33c72', 'Homem', 'now()', 'now()'), 
      ('1178671c-dfd9-4439-8ffa-9965e74efa89', '4b802ed3-b611-4067-8836-bab47b436cc4', 'Mulher', 'now()', 'now()'), 
      ('2020b7c5-445a-4bd6-a96b-4b921cee5c43', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Andrógena', 'now()', 'now()'), 
      ('fa6448f6-eeb2-426f-80a5-f526d9ad9849', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Andrógeno', 'now()', 'now()'), 
      ('025af927-d610-496a-a90d-0839676275f4', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Bi-gênero', 'now()', 'now()'), 
      ('1e2b0189-2ee7-4bc5-941b-ce7059f3d2c1', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Cross-Dresser', 'now()', 'now()'), 
      ('6f4a928e-b2b0-496c-88bc-4622961759f3', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Dobrador de gênero (Gender-Bender)', 'now()', 'now()'), 
      ('27cb3ee9-13c0-4029-b455-ffd7d1760619', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Dom de Gênero (Gender-Gifted)', 'now()', 'now()'), 
      ('b86d8476-ba12-4f0b-bf78-fceabe69f975', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Drag-King', 'now()', 'now()'), 
      ('8c9d7623-4643-4797-bbbb-9f428018c09b', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Drag-Queen', 'now()', 'now()'), 
      ('418190f0-3e5e-4efd-8a23-e199f3de29f0', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Espírito Duplo', 'now()', 'now()'), 
      ('0c1c51dd-8b20-4700-a021-efa74c8e871c', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Femigênero (Femme)', 'now()', 'now()'), 
      ('2cfd5720-473c-4b23-b530-6320f1c0fb5b', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Femme Queen', 'now()', 'now()'), 
      ('5ceb8613-a644-4731-8209-67b1be124393', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'FTM', 'now()', 'now()'), 
      ('5c7b88fc-7fe0-47b8-8e05-afc61397f70b', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Fêmea-para-macho', 'now()', 'now()'), 
      ('38629d21-dbba-4ff9-a3c8-5c2df4c4a745', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Gênero fluido', 'now()', 'now()'), 
      ('1f76379e-8a49-4199-bcb8-a40a7fff0edf', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Gênero fronteiriço', 'now()', 'now()'), 
      ('fe355c44-7309-4980-9d75-2479e2a9ebac', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Gênero queer', 'now()', 'now()'), 
      ('0cab9d71-2479-447a-9e99-b7d9aeb61437', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Hijra', 'now()', 'now()'), 
      ('b1f43214-57f3-49a4-b6aa-0f0fa200e5ae', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Macho-para-fêmea', 'now()', 'now()'), 
      ('4d85982d-8657-4d8b-908e-ef3301daca99', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Mascugênero (Butch)', 'now()', 'now()'), 
      ('ba38253f-41cb-4945-9b04-6dc296d89835', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'MTF', 'now()', 'now()'),
      ('29d0a17a-d193-474b-8873-8e48b4ba700e', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Non-Op', 'now()', 'now()'),
      ('32ee6739-2f84-44b3-93ca-3657bb117c61', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Pangênero', 'now()', 'now()'),
      ('9da99265-fb92-4026-adb9-1c62d7c6556b', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Pessoa em experiência transgênera', 'now()', 'now()'), 
      ('94106cba-98e9-4eac-9c5f-67a08ce21e14', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Pessoa trans', 'now()', 'now()'),
      ('309f91d4-283e-402b-a392-57d2aab0882b', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Sem Gênero', 'now()', 'now()'), 
      ('6afc5490-4836-4f84-b4a1-cd7365576354', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Terceiro sexo', 'now()', 'now()'), 
      ('63adb170-9f95-4dea-8356-770ab4118ed2', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Trans', 'now()', 'now()'),
      ('9d75f1e2-fd23-4287-92cb-d3c091c1f453', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Transexual/Transsexual', 'now()', 'now()'),
      ('dc49cbe2-005d-4dc6-8259-c2bf8444a172', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Transgênero não binário', 'now()', 'now()')`
  )

  await connection.close()
}

create().then(() => console.log('Genres table created!'))
