import createConnection from '../index'

async function create() {
  const connection = await createConnection()

  await connection.query(
    `INSERT INTO mobile_operators (
      id,
      cnpj,
      legal_name,
      trade_name,
      code,
      created_at,
      updated_at
    ) values 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', '71208516021090', 'Algar Telecom S.A.', 'CTBC Telecom', '12', 'now()', 'now()'), 
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', '02558157000162', 'Telefônica Brasil S.A.', 'Vivo', '15', 'now()', 'now()'), 
      ('4b802ed3-b611-4067-8836-bab47b436cc4', '40432544000147', 'Claro S.A.', 'Claro', '21', 'now()', 'now()'), 
      ('2814da68-5179-4152-bd7e-22361b844b88', '76535764000224', 'Oi S.A.', 'Oi', '31', 'now()', 'now()'), 
      ('f62c8c93-0312-4025-a880-65a4a5462a7f', '01371416000189', 'Sercomtel S.A.', 'Sercomtel', '43', 'now()', 'now()'), 
      ('c85462df-94c5-4b8a-a2c5-3149531aa447', '66970229018104', 'Nextel Telecomunicacoes Ltda', 'Nextel', '99', 'now()', 'now()'), 
      ('5aefe650-10a3-4e0d-a018-4704975d84b6', '02421421000111', 'TIM S.A.', 'TIM', '41', 'now()', 'now()')`
  )

  await connection.close()
}

create().then(() => console.log('States table created!'))
