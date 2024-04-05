import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

import createConnection from '../index'

async function create() {
  const connection = await createConnection()


  // block reasons

  await connection.query(
    `INSERT INTO block_reasons (
      id,
      code,
      description,
      instructions_to_solve,
      is_solved_by_password_reset,
      created_at,
      updated_at
    ) values 
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', '001', 'Conta bloqueada por excesso de tentativas de acesso.', 'Use a opção de reset de senha.', true, 'now()', 'now()')`
  )


  // user groups

  await connection.query(
    `INSERT INTO user_groups (
      id,
      name,
      created_at,
      updated_at
    ) values 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', 'bolha-dev', 'now()', 'now()')`
  )


  // users

  const id = uuidV4()
  const password = await hash('admin', 8)

  await connection.query(
    `INSERT INTO users (
      id, 
      user_group_id,
      name, 
      email, 
      password, 
      is_admin, 
      is_super_user, 
      created_at,
      updated_at
    ) values (
      '${id}', 
      'ca49908a-28cd-4573-808c-36c5f42a2e68',
      'admin', 
      'admin@bolhadev.com.br', 
      '${password}', 
      true, 
      true, 
      'now()', 
      'now()'
    )`
  )
  

  // modules

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


  // menu options

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
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001', 'Segurança', '', 'lock_person', 'security', 'now()', 'now()'), 
      ('29d0a17a-d193-474b-8873-8e48b4ba700e', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001001', 'Motivos de Bloqueio', '/block-reasons', 'List', 'security-block-reasons', 'now()', 'now()'), 
      ('5185e703-21f1-4f53-9471-617b0dff8f73', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001002', 'Grupos de Usuários', '/user-groups', 'List', 'security-user-groups', 'now()', 'now()'), 
      ('2afd6619-ba71-447e-989e-76a4b21c8871', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001003', 'Usuários', '/users', 'List', 'security-users', 'now()', 'now()'), 
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001004', 'Módulos', '/modules', 'List', 'security-modules', 'now()', 'now()'), 
      ('4b802ed3-b611-4067-8836-bab47b436cc4', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001005', 'Opções de Menu', '/menu-options', 'List', 'security-menu-options', 'now()', 'now()'), 
      ('2814da68-5179-4152-bd7e-22361b844b88', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001006', 'Perfis', '/profiles', 'List', 'security-profiles', 'now()', 'now()'), 
      ('b65f0fa5-27f5-498d-ba50-7008516bfcb9', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001007', 'Usuários x Perfis', '/users-profiles', 'List', 'security-users-profiles', 'now()', 'now()'), 
      ('0471bddc-de4c-42d1-a778-b67086796de1', '5aefe650-10a3-4e0d-a018-4704975d84b6', '001008', 'Navegação', '/navigations', 'List', 'security-navigations', 'now()', 'now()'),
			('d6e73c1e-e53f-4ee9-850f-714ed9f3449c', '6a0d2ad5-b167-4fa0-b030-eece875add34', '002', 'Vagas', '', 'fa-solid fa-gear', 'vagas', 'now()', 'now()'),
			('74e2a393-ecb4-44ad-bf52-9cc4933e9ace', '6a0d2ad5-b167-4fa0-b030-eece875add34', '002001', 'Procurar Vagas', '/vagas', 'DvrOutlinedIcon', 'vagas-vagas', 'now()', 'now()'),
			('159715d8-1141-443c-9e6a-686729fc908e', '2c25a4d2-c8b4-47e6-abeb-753127a0e9b5', '003', 'Tabelas', '', 'fa-solid fa-table', 'comum', 'now()', 'now()'),
			('528f6e78-cd53-4fca-a574-4ddd8492c9e4', '2c25a4d2-c8b4-47e6-abeb-753127a0e9b5', '003001', 'Países', '/paises', 'public', 'comum-paises', 'now()', 'now()'),
			('8bb2c069-d778-4591-a8ec-412ee22c4014', '2c25a4d2-c8b4-47e6-abeb-753127a0e9b5', '003002', 'Estados', '/estados', 'public', 'comum-estados', 'now()', 'now()'),
			('c7e5116e-11e2-4ffa-8208-e24e57c07cc7', '2c25a4d2-c8b4-47e6-abeb-753127a0e9b5', '003003', 'Cidades', '/cidades', 'apartment', 'comum-cidades', 'now()', 'now()'),
			('611e894d-b024-4cc4-b01c-6bd1c0bbc18b', '2c25a4d2-c8b4-47e6-abeb-753127a0e9b5', '003004', 'CEP', '/ceps', 'groups', 'comum-ceps', 'now()', 'now()')`
  )


  // profiles

  await connection.query(
    `INSERT INTO profiles (
      id,
      user_group_id,
      name,
      created_at,
      updated_at
    ) values 
      ('3c99decf-f975-4b16-b552-0747afd397a3', 'ca49908a-28cd-4573-808c-36c5f42a2e68', 'Admin', 'now()', 'now()')`
  )


  // profile options

  await connection.query(
    `INSERT INTO profile_options (
      id,
      profile_id,
      menu_option_key,
      permit_all,
      created_at,
      updated_at
    ) values 
      ('ca49908a-28cd-4573-808c-36c5f42a2e68', '3c99decf-f975-4b16-b552-0747afd397a3', 'security', true, 'now()', 'now()'),
      ('29d0a17a-d193-474b-8873-8e48b4ba700e', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-block-reasons', true, 'now()', 'now()'),
      ('5185e703-21f1-4f53-9471-617b0dff8f73', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-user-groups', true, 'now()', 'now()'),
      ('2afd6619-ba71-447e-989e-76a4b21c8871', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-users', true, 'now()', 'now()'),
      ('d79db0a2-5e8c-4fe6-81e0-5418cfa33c72', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-modules', true, 'now()', 'now()'),
      ('4b802ed3-b611-4067-8836-bab47b436cc4', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-menu-options', true, 'now()', 'now()'),
      ('2814da68-5179-4152-bd7e-22361b844b88', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-profiles', true, 'now()', 'now()'),
      ('b65f0fa5-27f5-498d-ba50-7008516bfcb9', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-users-profiles', true, 'now()', 'now()'),
      ('0471bddc-de4c-42d1-a778-b67086796de1', '3c99decf-f975-4b16-b552-0747afd397a3', 'security-navigations', true, 'now()', 'now()'),
			('ba8832e9-8437-403e-a65a-6102531f6b0e', '3c99decf-f975-4b16-b552-0747afd397a3', 'vagas', true, 'now()', 'now()'),
			('ebb2ec1f-0534-4e72-a0eb-2f687126b57d', '3c99decf-f975-4b16-b552-0747afd397a3', 'vagas-vagas', true, 'now()', 'now()'),
			('374b309a-7207-4d3e-9cff-02a7fe49a77f', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum', true, 'now()', 'now()'),
			('ef877929-a9ba-4e05-a9cf-9fcf50033320', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-paises', true, 'now()', 'now()'),
			('67ad22d9-9e74-4c8d-b52d-ca57e8326d08', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-estados', true, 'now()', 'now()'),
			('b377df60-1a2e-4863-8a30-1b398fb1f032', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-cidades', true, 'now()', 'now()'),
			('17e7e2fd-c57b-4da6-bd5e-e93349e0c50f', '3c99decf-f975-4b16-b552-0747afd397a3', 'comum-ceps', true, 'now()', 'now()')`
  )


  // user x profile

  await connection.query(
    `INSERT INTO users_profiles (
      id,
      user_id,
      profile_id,
      created_at,
      updated_at
    ) values 
      ('4b802ed3-b611-4067-8836-bab47b436cc4', '${id}', '3c99decf-f975-4b16-b552-0747afd397a3', 'now()', 'now()')`
  )

  await connection.close()
}

create().then(() => console.log('Admin and Security tables created!'))
