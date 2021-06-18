import { Router } from 'express'
import postService from '../services/PostService'
import { Post } from '../models/Post'
import { Location } from '../models/Location'
import { Bounderies } from '../models/LatLang'
const postRoutes = Router()

postRoutes.post('/', async (req, res) => {
  try {
    const userId = parseInt(req.body.owner)
    const post = Post.fromJson(req.body)
    return res.json(await postService.create(userId, post))
  } catch (error) {
    res.status(400).send(error.message)
  }
})

postRoutes.get('/getAll/:postId', async (req, res) => {
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

/*postRoutes.delete('/:postId', async (req, res) => {
  try {
    const post = parseInt(req.params.postId)
    return res.json(await postService.deletePost(post))
  } catch (error) {
    res.send(error.message)
  }
})*/

postRoutes.put('/by-location', async (req, res) => {
  try {
    const bounderies = req.body as Bounderies
    return res.json(await postService.getByLocation(bounderies))
  }catch (error) {
    res.status(400).send(error.message)
  }
})

export default postRoutes
