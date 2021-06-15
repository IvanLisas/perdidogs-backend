import { Router } from 'express'
import postService from '../services/PostService'
import { Post } from '../models/Post'
const postRoutes = Router()

postRoutes.get('/getAll/:id', (req, res) => {
  try {
<<<<<<< HEAD
    const post = parseInt(req.params.id)
    return res.json(postService.getAll(post))
=======
    const userId = parseInt(req.params.userId)
    const post = Post.fromJson(req.body)
    console.log(post, "la concha de tu madre")
    return res.json(await postService.create(userId, post))
    
>>>>>>> ef1b09b6322739a3deb6e8d320f18c2b0f8d9f40
  } catch (error) {
    res.status(400).send(error.message)
  }
})

<<<<<<< HEAD
postRoutes.post('/', async (req, res) => {
  try {
    return res.json(postService.create(req.body))
=======

postRoutes.get('/getAll/:postId',async (req, res) => {
  try {
    const post = parseInt(req.params.postId)
    return res.json(await postService.getAllPosts(post))
>>>>>>> ef1b09b6322739a3deb6e8d320f18c2b0f8d9f40
  } catch (error) {
    res.status(400).send(error.message)
  }
})
<<<<<<< HEAD

postRoutes.get('getMy/:id', async (req, res) => {
=======
postRoutes.get('/:postId', async (req, res) => {
>>>>>>> ef1b09b6322739a3deb6e8d320f18c2b0f8d9f40
  try {
    const post = parseInt(req.params.id)
    return res.json(postService.get(post))
  } catch (error) {
    res.status(404).send(error.message)
  }
})

<<<<<<< HEAD
postRoutes.post('/:id/:userId', async (req, res) => {
  try {
    const post = parseInt(req.params.id)
    const user = parseInt(req.params.userId)
    return res.json(postService.update(post, user))
  } catch (error) {
    res.status(400).send({ message: 'No se pudo actualizar la publicacion' })
=======

postRoutes.delete('/:postId', async (req, res) => {
  try {
    const post = parseInt(req.params.postId)
    return res.json(await postService.deletePost(post))
  } catch (error) {
    res.send(error.message)
>>>>>>> ef1b09b6322739a3deb6e8d320f18c2b0f8d9f40
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
