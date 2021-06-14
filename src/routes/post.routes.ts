import { Router } from 'express'
import postService from '../services/PostService'
import { Post } from '../models/Post'
const postRoutes = Router()


postRoutes.post ('/:userId', async (req,res) => {

 try{
  const userId = parseInt(req.params.userId)
  const post = Post.fromJson(req.body)
  return await postService.create(userId, post)
 
 }catch (error) {
    res.status(400).send({ message: 'No se pudo crear la publicacion' })
  }
 
  
})



postRoutes.get('/getAll/:PostId', async(req, res) => {
  try {
    const post = parseInt(req.params.postId)
    return res.json(postService.getAllPosts(post))
  } catch (error) {
    res.status(400).send({ message: 'No se encontraron publicaciones' })
  }
})

postRoutes.get('getMy/:PostId', async(req, res) => {
  try {
    const post = parseInt(req.params.postId)
    return res.json(postService.get(post))
  } catch (error) {
    res.status(400).send({ message: 'No se encontró la publicación' })
  }
})

postRoutes.post('/:PostId',async (req, res) => {
  try {
    const postId = parseInt(req.params.postId)
    const userId = parseInt(req.params.userId)
    return res.json(postService.updatePost(postId, userId))
  } catch (error) {
    res.status(400).send({ message: 'No se pudo actualizar la publicacion' })
  }
})

postRoutes.delete('/:PostId',async (req, res) => {
  try {
    const post = parseInt(req.params.postId)
    return res.json(postService.deletePost(post))
  } catch (error) {
    res.send({ message: 'No se pudo borrar la publicacion' })
  }
})

export default postRoutes
