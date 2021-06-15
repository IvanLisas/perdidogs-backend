import { Router } from 'express'
import postService from '../services/PostService'
import { Post } from '../models/Post'
const postRoutes = Router()

postRoutes.get('/getAll/:id', (req, res) => {
  try {
    const post = parseInt(req.params.id)
    return res.json(postService.getAll(post))
  } catch (error) {
    res.status(400).send(error.message)
  }
})

postRoutes.post('/', async (req, res) => {
  try {
    return res.json(postService.create(req.body))
  } catch (error) {
    res.status(400).send({ message: 'No se encontraron publicaciones' })
  }
})

postRoutes.get('getMy/:id', async (req, res) => {
  try {
    const post = parseInt(req.params.id)
    return res.json(postService.get(post))
  } catch (error) {
    res.status(404).send(error.message)
  }
})

postRoutes.post('/:id/:userId', async (req, res) => {
  try {
    const post = parseInt(req.params.id)
    const user = parseInt(req.params.userId)
    return res.json(postService.update(post, user))
  } catch (error) {
    res.status(400).send({ message: 'No se pudo actualizar la publicacion' })
  }
})

// postRoutes.delete('/:id', (req, res) => {
//   try {
//     const post = parseInt(req.params.id)
//     return res.json(postService.delete(post))
//   } catch (error) {
//     res.send({ message: 'No se pudo borrar la publicacion' })
//   }
// })

export default postRoutes
