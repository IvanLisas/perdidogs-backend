import { Router } from 'express'
import postService from '../services/PostService'
import { Post } from '../models/Post'
const postRoutes = Router()

postRoutes.post('/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId)
    const post = Post.fromJson(req.body)
    console.log(post, "")
    return res.json(await postService.create(userId, post))
    
  } catch (error) {
    res.status(400).send(error.message)
  }
})


postRoutes.get('/getAll/:postId',async (req, res) => {
  try {
    const post = parseInt(req.params.postId)
    return res.json(await postService.getAllPosts(post))
  } catch (error) {
    res.status(400).send(error.message)
  }
})
postRoutes.get('/:postId', async (req, res) => {
  try {
    const postId = parseInt(req.params.postId)
    return res.json(await postService.get(postId))
  } catch (error) {
    res.status(404).send(error.message)
  }
})


postRoutes.delete('/:postId', async (req, res) => {
  try {
    const post = parseInt(req.params.postId)
    return res.json(await postService.deletePost(post))
  } catch (error) {
    res.send(error.message)
  }
})

export default postRoutes
