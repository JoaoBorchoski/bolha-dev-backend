import createConnection from '../index'

async function create() {
  const connection = await createConnection()

  await connection.query(`TRUNCATE TABLE menu_options`)

  await connection.query(
    `INSERT INTO menu_options (
    	id,
			module_id,
			sequence,
			label,
			route,
			icon,
			key,
      created_at,
      updated_at
    ) values 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001', 'Segurança', '', 'Policy', 'security', 'now()', 'now()'), 
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001001', 'Módulos da Aplicação', '/modules', 'List', 'security-modules', 'now()', 'now()'), 
      ('4b802ed3-b611-4067-8836-bab47b436cc4', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001002', 'Opções de Menu', '/menu-options', 'List', 'security-menu-options', 'now()', 'now()'), 
      ('2814da68-5179-4152-bd7e-22361b844b88', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001003', 'Perfis de Usuário', '/users-profiles', 'List', 'security-users-profiles', 'now()', 'now()'), 
      ('f62c8c93-0312-4025-a880-65a4a5462a7f', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001004', 'Opções do Perfil', '/profile-options', 'List', 'security-profile-options', 'now()', 'now()'), 
      ('b65f0fa5-27f5-498d-ba50-7008516bfcb9', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001005', 'Perfis de Usuário', '/users-profiles', 'List', 'security-users-profiles', 'now()', 'now()'), 
      ('0471bddc-de4c-42d1-a778-b67086796de1', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001006', 'Navegação', '/navigation', 'List', 'security-navigation', 'now()', 'now()'),
			('d6e73c1e-e53f-4ee9-850f-714ed9f3449c', '6a0d2ad5-b167-4fa0-b030-eece875add34', '002', 'Vagas', '', 'fa-solid fa-gear', 'vagas', 'now()', 'now()'),
			('74e2a393-ecb4-44ad-bf52-9cc4933e9ace', '6a0d2ad5-b167-4fa0-b030-eece875add34', '002001', 'Procurar Vagas', '/vagas', 'DvrOutlinedIcon', 'vagas-vagas', 'now()', 'now()'),
			('159715d8-1141-443c-9e6a-686729fc908e', '2c25a4d2-c8b4-47e6-abeb-753127a0e9b5', '003', 'Tabelas', '', 'fa-solid fa-table', 'comum', 'now()', 'now()'),
			('528f6e78-cd53-4fca-a574-4ddd8492c9e4', '2c25a4d2-c8b4-47e6-abeb-753127a0e9b5', '003001', 'Países', '/paises', 'public', 'comum-paises', 'now()', 'now()'),
			('8bb2c069-d778-4591-a8ec-412ee22c4014', '2c25a4d2-c8b4-47e6-abeb-753127a0e9b5', '003002', 'Estados', '/estados', 'public', 'comum-estados', 'now()', 'now()'),
			('c7e5116e-11e2-4ffa-8208-e24e57c07cc7', '2c25a4d2-c8b4-47e6-abeb-753127a0e9b5', '003003', 'Cidades', '/cidades', 'apartment', 'comum-cidades', 'now()', 'now()'),
			('611e894d-b024-4cc4-b01c-6bd1c0bbc18b', '2c25a4d2-c8b4-47e6-abeb-753127a0e9b5', '003004', 'CEP', '/ceps', 'groups', 'comum-ceps', 'now()', 'now()')`
  )

  await connection.close()
}

create().then(() => console.log('Menu options table created!'))
