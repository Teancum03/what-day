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
    {
      id: 4,
      idea: 'E-commerce Website',
      description:
        'Create an online store where users can browse and purchase products. Implement features such as product catalog, shopping cart, user authentication, and payment integration.',
    },

    {
      id: 5,
      idea: 'Blogging Platform',
      description: 'Develop a platform for users to create and publish their own blogs. Include features like user registration, post creation and editing, commenting system, and search functionality.',
    },

    {
      id: 6,
      idea: 'Event Management System',
      description: 'Build a system to manage and display upcoming events, such as conferences or concerts. Include features like event registration, ticketing, event details, and notifications.',
    },
    {
      id: 7,
      idea: 'Social Media Platform',
      description:
        'Create a social media platform where users can connect with friends, share posts, upload photos and videos, and interact with each other through comments and likes.',
    },

    {
      id: 8,
      idea: 'Online Learning Platform',
      description: 'Build an online learning platform that offers courses in various subjects. Include features such as course catalog, enrollment, progress tracking, quizzes, and discussion forums.',
    },

    {
      id: 9,
      idea: 'Job Board',
      description: 'Develop a job board website where employers can post job openings and job seekers can search and apply for jobs. Implement features like job search filters, resume uploading, and email notifications for new job postings.',
    },
  ])
}
