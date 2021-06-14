import { Router } from 'express'
import postService from '../services/PostService'

const postRoutes = Router()

postRoutes.get('/getAll/:Postid', (req, res) => {
  try {
    const post = parseInt(req.params.postid)
    return res.json(postService.getAll(post))
  } catch (error) {
    res.status(400).send({ message: 'No se encontraron publicaciones' })
  }
})

postRoutes.post('/', async (req, res) => {
  try {
    return res.json(postService.create(req.body))
  } catch (error) {
    res.status(400).send({ message: 'No se pudo crear la publicacion' })
  }
})

postRoutes.get('getMy/:Postid', async (req, res) => {
  try {
    const post = parseInt(req.params.postid)
    return res.json(postService.get(post))
  } catch (error) {
    res.status(400).send({ message: 'No se encontró la publicación' })
  }
})

postRoutes.post('/:postid/:userId', async (req, res) => {
  try {
    const post = parseInt(req.params.postId)
    const user = parseInt(req.params.userId)
    return res.json(postService.update(post, user))
  } catch (error) {
    res.status(400).send({ message: 'No se pudo actualizar la publicacion' })
  }
})

// postRoutes.delete('/:Postid', (req, res) => {
//   try {
//     const post = parseInt(req.params.postid)
//     return res.json(postService.delete(post))
//   } catch (error) {
//     res.send({ message: 'No se pudo borrar la publicacion' })
//   }
// })

export default postRoutes
