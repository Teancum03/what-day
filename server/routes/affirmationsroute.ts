import request from 'superagent'

import express from 'express'

const server = express()
server.use(express.json())

server.use('/api/v1/mindful-moments', async (req, res) => {
  const response = await request.get('https://www.affirmations.dev/')
  res.json(response.body)
})

export default server
