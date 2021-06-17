import { Router } from 'express'
import postService from '../services/PostService'
import { Post } from '../models/Post'
import { Location } from '../models/Location'
const postRoutes = Router()

postRoutes.get('/getAll/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId)
    const post = Post.fromJson(req.body)
    console.log(post, '')
    return res.json(await postService.create(userId, post))
  } catch (error) {
    res.status(400).send(error.message)
  }
})

postRoutes.get('/getAll/:postId', async (req, res) => {
  try {
    const post = parseInt(req.params.postId)
    return res.json(await postService.getAllPosts(post))
  } catch (error) {
    res.status(400).send(error.message)
  }
})
postRoutes.get('/:postId', async (req, res) => {
  try {
    const post = parseInt(req.params.id)
    return res.json(postService.get(post))
  } catch (error) {
    res.status(404).send(error.message)
  }
})

postRoutes.delete('/:postId', async (req, res) => {
  /*try {
    const post = parseInt(req.params.postId)
    return res.json(await postService.deletePost(post))
  } catch (error) {
    res.send(error.message)
  }*/
})

// postRoutes.delete('/:id', (req, res) => {
//   try {
//     const post = parseInt(req.params.id)
//     return res.json(postService.delete(post))
//   } catch (error) {
//     res.send({ message: 'No se pudo borrar la publicacion' })
//   }
// })

postRoutes.get('/by-location/:x/:y/:radio', async (req, res) => {
  try {
    const location = Location.createNewLocation(parseFloat(req.params.x), parseFloat(req.params.y))

    return res.json(await postService.getByLocation(location, parseFloat(req.params.radio)))
  } catch (error) {
    res.status(400).send(error.message)
  }
})

export default postRoutes
