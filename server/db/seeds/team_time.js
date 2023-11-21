/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('team_time').del()
  await knex('team_time').insert([
    {
      id: 1,
      idea: 'Duck vs Bear',
      description:
        'An app that gets users to choose between to scary options at a time and shows a list of the most scary!',
    },

    {
      id: 2,
      idea: 'Pokemon Game',
      description: 'An game about pokemon',
    },

    {
      id: 3,
      idea: 'Codeing Assistant',
      description: 'An app that helps you code',
    },
  ])
}
