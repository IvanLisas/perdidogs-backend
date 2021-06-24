import { Router } from 'express'
import postService from '../services/PostService'
import { Post } from '../models/Post'
import { Geometry } from '../models/LatLang'
import { Filter } from '../models/Filter'

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

//EDITAR un post
postRoutes.put('/', async (req, res) => {
  try {
    const post = Post.fromJson(req.body)
    return res.json(await postService.update(post))
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

//GET BY FILTER post
postRoutes.put('/by-filter', async (req, res) => {
  try {
    console.log(req.body)
    return res.json(await postService.getPostByFilters(req.body as Filter))
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
    /*  console.log(req.body) */
    const bounderies = req.body.viewport as Geometry

    return res.json(await postService.getByLocation(bounderies))
  } catch (error) {
    console.log(error)
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
