import { Router } from 'express'
import postService from '../services/PostService'
import { Post } from '../models/Post'
import { Point } from '../models/LatLang'
import { Filter } from '../models/Filter'
import { PostFilter } from '../admin-module/models/PostFilter'

const postRoutes = Router()

postRoutes.post('/', async (req, res) => {
  try {
    console.log(req.body)
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
  console.log(req.body)
  try {
    if (!req.body.pet) {
      res.json(await postService.getByLocation(req.body.searchLocation, req.body.deltaLocation))
    } else {
      const pet = req.body.pet
      console.log('PASA ANTES DE LLAMAR AL getPOstByFIlters()', pet.fur.color.Id)
      const filter = Filter.newFilter(pet.breed, pet.hasCollar, pet.fur.color.Id, pet.fur.length.Id, pet.size.Id, pet.sex, req.body.searchLocation, req.body.deltaLocation)
      console.log('COLOOOOOOOOOOOOOOOOOOR', filter.color)
      return res.json(await postService.getPostByFilters(filter))
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
})

postRoutes.put('/by-admin-filter', async (req, res) => {
  try {
    return res.json(await postService.getPostByAdminFilters(req.body))
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

postRoutes.put('/by-location', async (req, res) => {
  try {
    const bounderies = req.body.viewport as Point
    return res.json(await postService.getByLocation(bounderies, { lat: 0, lng: 0 }))
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

postRoutes.delete('/:postId/:userId', async (req, res) => {
  try {
    const postId = parseInt(req.params.postId)
    const userId = parseInt(req.params.userId)
    return res.json(await postService.delete(postId, userId))
  } catch (error) {
    res.send(error.message)
  }
})

export default postRoutes
