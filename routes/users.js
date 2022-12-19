import express from 'express'
import mongoose from 'mongoose'
import Users from '../models/users.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await Users.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await Users
      .findById(id)

    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

router.post('/', async (req, res) => {
  const user = req.body
  const newUser = new Users(user)
  try {
    await newUser.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
})

router.patch('/:id', async (req, res) => {
  const { id: _id } = req.params
  const user = req.body
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that id') 

  const updatedUser = await Users.findByIdAndUpdate(_id, { ...user, _id }, { new: true })
  res.json(updatedUser)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id')

  await Users.findByIdAndRemove(id)
  res.json({ message: 'User deleted successfully' })
})

export default router