import express = require('express')
import { Router } from 'express'
import chatService from '../services/ChatService'
import postService, { PostService } from '../services/PostService'

const postRoutes = Router()

module.exports = function (app: express.Application) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*') // allow requests from any other server
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE') // allow these verbs
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control')
    next()
  })

  postRoutes.get('/getAllPosts/:PostId', (req, res) => {
    const post = parseInt(req.params.postId)
    return res.json(postService.getAllPosts(post))
  })

  postRoutes.post('/createPost', (req, res) => {
    return res.json(postService.createPost(req.body))
  })
   

  postRoutes.get('/getAPost/:PostId', (req, res) => {
    const post = parseInt(req.params.postId)
    return res.json(postService.getAPostById(req.body))
  }) 

  postRoutes.get('/updateAPost/:PostId', (req, res) => {
    const post = parseInt(req.params.postId)
    return res.json(postService.getAPostById(req.body))
  }) 
}
}




export default postRoutes