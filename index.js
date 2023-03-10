import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import usersRoutes from './routes/users.js'

dotenv.config()

const app  = express()
const PORT = process.env.PORT

app.use(bodyParser.json())

app.use('/users', usersRoutes)

app.get('/', (req, res) => {
  res.send('Hello World')
})

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const db = mongoose.connection

db.on('error', (error) => console.error(error))

db.once('open', () => {
  app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))
})