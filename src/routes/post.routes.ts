import express = require('express')
import { Router } from 'express'
import chatService from '../services/ChatService'
import postService, { PostService } from '../services/PostService'

const postRoutes = Router()

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

export default postRoutes
