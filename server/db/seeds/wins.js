/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('wins').del()
  await knex('wins').insert([
    {
      title: 'My win this week was finding the biggest anthill!',
      author: 'Anonymous Aardvark',
    },
    {
      title: 'Today my brothers and I got together and watched the sunset',
      author: 'Mysterious Meerkat',
    },
  ])
}
