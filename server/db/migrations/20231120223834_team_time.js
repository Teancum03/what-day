/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('team_time', (table) => {
    table.increments('id').primary()
    table.string('Idea')
    table.text('description')
    // table.string('author')
    //  table.string('image')
    // table.number('vote_count')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('team_time')
}
