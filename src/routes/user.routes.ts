import express = require('express')
import { Router } from 'express'
import userService from '../services/UserService'

const chatRoutes = Router()

module.exports = function (app: express.Application) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*') // allow requests from any other server
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE') // allow these verbs
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control')
    next()
  })

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

}

export default chatRoutes
