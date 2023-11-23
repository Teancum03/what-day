/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('background_images', (table) => {
    table.increments('id').primary()
    table.string('img_name')
    table.string('name_id')
    table.string('user_name')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('background_images')
}
