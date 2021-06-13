import express = require('express')
import { Router } from 'express'
import userService from '../services/UserService'

const chatRoutes = Router()

chatRoutes.get('/getUser/:userId', (req, res) => {
  const id = parseInt(req.params.userId)
  return res.json(userService.getUser(id))
})

chatRoutes.post('/saveUser', (req, res) => {
  return res.json(userService.saveUser(req.body))
})

chatRoutes.delete('/deleteUser', (req, res) => {
  return res.json(userService.saveUser(req.body))
})

export default chatRoutes
