/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('testing_tips', (table) => {
    table.increments('id').primary()
    table.string('title')
    table.text('what_we_test')
    table.text('things_to_remember')
    table.text('extra_installs')
    table.text('code_from_class')
    table.text('link_to_lecture')
  })                  
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('testing_tips')
}
