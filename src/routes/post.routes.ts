import { Router } from 'express'
import postService from '../services/PostService'

const postRoutes = Router()

postRoutes.get('/getAll/:PostId', (req, res) => {
  try {
    const post = parseInt(req.params.postId)
    return res.json(postService.getAllPosts(post))
  } catch (error) {
    res.status(400).send({ message: 'No se encontraron publicaciones' })
  }
})

postRoutes.post('/', (req, res) => {
  try {
    return res.json(postService.createPost(req.body))
  } catch (error) {
    res.status(400).send({ message: 'No se pudo crear la publicacion' })
  }
})

postRoutes.get('getMy/:PostId', (req, res) => {
  try {
    const post = parseInt(req.params.postId)
    return res.json(postService.getAPostById(post))
  } catch (error) {
    res.status(400).send({ message: 'No se encontró la publicación' })
  }
})

postRoutes.post('/:PostId', (req, res) => {
  try {
    const post = parseInt(req.params.postId)
    return res.json(postService.updatePost(post))
  } catch (error) {
    res.status(400).send({ message: 'No se pudo actualizar la publicacion' })
  }
})

postRoutes.delete('/:PostId', (req, res) => {
  try {
    const post = parseInt(req.params.postId)
    return res.json(postService.deletePost(post))
  } catch (error) {
    res.send({ message: 'No se pudo borrar la publicacion' })
  }
})

export default postRoutes
