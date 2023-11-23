import express from 'express'
import multer from 'multer'

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import dotenv from 'dotenv'

dotenv.config()

const BUCKET_NAME = process.env.BUCKET_NAME || 'no-bucket-name'
const BUCKET_REGION = process.env.BUCKET_REGION || 'no-bucket-region'
const ACCESS_KEY = process.env.ACCESS_KEY || 'no-access-key'
const SECRET_ACCESS_KEY =
  process.env.SECRET_ACCESS_KEY || 'no-secret-access-key'

const s3 = new S3Client({
  region: BUCKET_REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
})

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.post('/', upload.single('image'), async (req, res) => {
  const { name } = req.body

  if (!req.file) {
    res.status(400).send('No file uploaded.')
    return
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: name,
    Body: req.file?.buffer,
    ContentType: req.file?.mimetype,
  }
  const command = new PutObjectCommand(params)
  await s3.send(command)

  res.send({})
})

export default router
