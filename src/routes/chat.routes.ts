import express = require('express')
import { Router } from 'express'
import chatService from '../services/ChatService'

const chatRoutes = Router()

module.exports = function (app: express.Application) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*') // allow requests from any other server
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE') // allow these verbs
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control')
    next()
  })

  chatRoutes.get('/getMyChats/:userId', (req, res) => {
    const id = parseInt(req.params.userId)
    return res.json(chatService.getAllChats(id))
  })

  chatRoutes.put('/sendMessage', (req, res) => {
    return res.json(chatService.saveChat(req.body))
  })

}

export default chatRoutes
