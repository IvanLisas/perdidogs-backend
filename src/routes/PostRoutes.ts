import { Router } from 'express'
import postService from '../services/PostService'
import { Post } from '../models/Post'
import { Point } from '../models/LatLang'
import { Filter } from '../models/Filter'

const postRoutes = Router()

postRoutes.post('/', async (req, res) => {
  try {
    const userId = parseInt(req.body.owner)
    const post = Post.fromJson(req.body)
    return res.json(await postService.create(userId, post))
  } catch (error) {
    console.log(error.message)
    res.status(400).send(error.message)
  }
})

postRoutes.put('/', async (req, res) => {
  try {
    const post = Post.fromJson(req.body)
    return res.json(await postService.update(post))
  } catch (error) {
    res.status(400).send(error.message)
  }
})

postRoutes.get('/getAll', async (req, res) => {
  try {
    return res.json(await postService.getAllPosts())
  } catch (error) {
    res.status(400).send(error.message)
  }
})

postRoutes.put('/by-filter', async (req, res) => {
  try {
    if (!req.body.pet) {
      res.json(await postService.getByLocation(req.body.searchLocation, req.body.deltaLocation, req.body.myLocation))
    } else {
      const pet = req.body.pet
      const filter = Filter.newFilter(pet, req.body.searchLocation, req.body.deltaLocation, req.body.myLocation)
      filter.myLocation= req.body.myLocation
      return res.json(await postService.getPostByFilters(filter))
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
})

postRoutes.get('/:postId', async (req, res) => {
  try {
    const postId = parseInt(req.params.postId)
    return res.json(await postService.findById(postId))
  } catch (error) {
    res.status(404).send(error.message)
  }
})

postRoutes.get('/by-user/:userId', async (req, res) => {
  try {
    const postId = parseInt(req.params.userId)
    return res.json(await postService.findByUserId(postId))
  } catch (error) {
    res.status(404).send(error.message)
  }
})

postRoutes.put('/aceptAPost/:postId/:userId', async (req, res) => {
  try {
    const postid = parseInt(req.params.postId)
    const userid = parseInt(req.params.userId)
 
    return res.json(await postService.aceptAPost(postid,userid))
  } catch (error) {
    res.status(404).send(error.message)
  }
})

postRoutes.put('/rejectAPost/:postId/:userId', async (req, res) => {
  try {
    const postId = parseInt(req.params.postId)
    const user = parseInt(req.params.userId)

    return res.json(await postService.rejectAPost(postId,user))
  } catch (error) {
    res.status(404).send(error.message)
  }
})

//DELETE a post
/*postRoutes.delete('/:postId', async (req, res) => {
  try {
    const postId = parseInt(req.params.postId)
    const userId = parseInt(req.params.userId)
    return res.json(await postService.delete(postId, userId))
  } catch (error) {
    res.send(error.message)
  }
})*/

export default postRoutes