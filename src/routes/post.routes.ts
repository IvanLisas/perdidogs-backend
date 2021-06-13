import { Router } from 'express'
import postService from '../services/PostService'
import { Post } from '../models/Post'
const postRoutes = Router()


postRoutes.post ('/', async (req,res) => {

 try{

  const post = new Post()
  post.description = req.body.description
  post.breed = req.body.breed
  post.size = req.body.size
  post.color = req.body.color
  post.picture = req.body.picture
  post.location = req.body.location
  post.creationDate = req.body.creationDate
  post.pet = req.body.pet

  return await postService.create(post)
 
 }catch (error) {
    res.status(400).send({ message: 'No se pudo crear la publicacion' })
  }
 
  
})



postRoutes.get('/getAll/:PostId', (req, res) => {
  try {
    const post = parseInt(req.params.postId)
    return res.json(postService.getAllPosts(post))
  } catch (error) {
    res.status(400).send({ message: 'No se encontraron publicaciones' })
  }
})

// postRoutes.post('/', (req, res) => {
//   try {
//     return res.json(postService.createPost(req.body))
//   } catch (error) {
//     res.status(400).send({ message: 'No se pudo crear la publicacion' })
//   }
// })

postRoutes.get('getMy/:PostId', (req, res) => {
  try {
    const post = parseInt(req.params.postId)
    return res.json(postService.get(post))
  } catch (error) {
    res.status(400).send({ message: 'No se encontró la publicación' })
  }
})

postRoutes.post('/:PostId', (req, res) => {
  try {
    const postId = parseInt(req.params.postId)
    const userId = parseInt(req.params.userId)
    return res.json(postService.updatePost(postId, userId))
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
