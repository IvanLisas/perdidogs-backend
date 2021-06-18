import { Router } from 'express'
import postService from '../services/PostService'
import { Post } from '../models/Post'
import { Bounderies } from '../models/LatLang'

const postRoutes = Router()

//POST a post
postRoutes.post('/', async (req, res) => {
  try {
    const userId = parseInt(req.body.owner)
    const post = Post.fromJson(req.body)
    return res.json(await postService.create(userId, post))
  } catch (error) {
    res.status(400).send(error.message)
  }
})

//GET ALL post
postRoutes.get('/getAll', async (req, res) => {
  try {
    return res.json(await postService.getAllPosts())
  } catch (error) {
    res.status(400).send(error.message)
  }
})

//GET ONE post
postRoutes.get('/:postId', async (req, res) => {
  try {
    const postId = parseInt(req.params.postId)
    return res.json(await postService.get(postId))
  } catch (error) {
    res.status(404).send(error.message)
  }
})

//GET a post BY LOCATION
postRoutes.put('/by-location', async (req, res) => {
  try {
    const bounderies = req.body as Bounderies
    return res.json(await postService.getByLocation(bounderies))
  } catch (error) {
    res.status(400).send(error.message)
  }
})

//DELETE a post
/*postRoutes.delete('/:postId', async (req, res) => {
  try {
    const post = parseInt(req.params.postId)
    return res.json(await postService.deletePost(post))
  } catch (error) {
    res.send(error.message)
  }
})*/

export default postRoutes
