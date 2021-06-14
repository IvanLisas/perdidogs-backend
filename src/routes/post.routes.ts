import { Router } from 'express'
import postService from '../services/PostService'
import { Post } from '../models/Post'
const postRoutes = Router()

<<<<<<< HEAD
postRoutes.get('/getAll/:Postid', (req, res) => {
  try {
    const post = parseInt(req.params.postid)
    return res.json(postService.getAll(post))
=======
postRoutes.post('/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId)
    const post = Post.fromJson(req.body)
    return res.json(await postService.create(userId, post))
>>>>>>> develop
  } catch (error) {
    res.status(400).send(error.message)
  }
})

<<<<<<< HEAD
postRoutes.post('/', async (req, res) => {
  try {
    return res.json(postService.create(req.body))
=======
postRoutes.get('/getAll/:PostId', (req, res) => {
  try {
    const post = parseInt(req.params.postId)
    return res.json(postService.getAllPosts(post))
>>>>>>> develop
  } catch (error) {
    res.status(400).send({ message: 'No se encontraron publicaciones' })
  }
})

<<<<<<< HEAD
postRoutes.get('getMy/:Postid', async (req, res) => {
  try {
    const post = parseInt(req.params.postid)
    return res.json(postService.get(post))
=======
// postRoutes.post('/', (req, res) => {
//   try {
//     return res.json(postService.createPost(req.body))
//   } catch (error) {
//     res.status(400).send({ message: 'No se pudo crear la publicacion' })
//   }
// })

postRoutes.get('/:postId', async (req, res) => {
  try {
    const postId = parseInt(req.params.postId)
    return res.json(await postService.get(postId))
>>>>>>> develop
  } catch (error) {
    res.status(404).send(error.message)
  }
})

<<<<<<< HEAD
postRoutes.post('/:postid/:userId', async (req, res) => {
  try {
    const post = parseInt(req.params.postId)
    const user = parseInt(req.params.userId)
    return res.json(postService.update(post, user))
=======
/* postRoutes.post('/:UserId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId)
    return res.json(postService.updatePost(userId, userId))
>>>>>>> develop
  } catch (error) {
    res.status(400).send({ message: 'No se pudo actualizar la publicacion' })
  }
}) */

// postRoutes.delete('/:Postid', (req, res) => {
//   try {
//     const post = parseInt(req.params.postid)
//     return res.json(postService.delete(post))
//   } catch (error) {
//     res.send({ message: 'No se pudo borrar la publicacion' })
//   }
// })

export default postRoutes
