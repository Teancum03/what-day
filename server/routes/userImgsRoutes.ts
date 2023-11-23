import express from 'express'
import multer from 'multer'
import crypto from 'crypto'

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { addBackgroundImage } from '../db/functions/backgroundImagesDB'
import { getAllBackgroundImages } from '../db/functions/backgroundImagesDB'

import dotenv from 'dotenv'
dotenv.config()

const randomImageName = () => crypto.randomBytes(32).toString('hex')

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
  const nameId = randomImageName()
  const { imgName, userName } = req.body

  if (!req.file) {
    res.status(400).send('No file uploaded.')
    return
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: nameId,
    Body: req.file?.buffer,
    ContentType: req.file?.mimetype,
  }
  const command = new PutObjectCommand(params)
  await s3.send(command)

  await addBackgroundImage({ imgName, nameId, userName })

  res.send({})
})

router.get('/', async (req, res) => {
  const backgroundImages = await getAllBackgroundImages()
  console.log('backgroundImages', backgroundImages)
  for (const image of backgroundImages) {
    const getObjectParams = {
      Bucket: BUCKET_NAME,
      Key: image.nameId,
    }
    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
    image.url = url
  }

  res.send(backgroundImages)
})

export default router
