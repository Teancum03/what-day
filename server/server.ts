import * as Path from 'node:path'
import express from 'express'

import testingTipRouter from './routes/testingTipsRoutes'
import galleryRouter from './routes/galleryRoutes'

const server = express()
server.use(express.json())

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

server.use('/api/v1/testing-tips', testingTipRouter)
server.use('/api/v1/gallery', galleryRouter)

export default server
