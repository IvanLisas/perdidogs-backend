import { Router } from 'express'
import { Comment } from '../models/Comment'
import commentService from '../services/CommentService'

const commentRoutes = Router()

commentRoutes.post('/', async (req, res) => {
  try {
    return res.json(await commentService.save(req.body as Comment))
  } catch (error) {
    res.status(403).send(error.message)
  }
})

commentRoutes.get('/:postId', async (req, res) => {
    try {
        const postId= req.params.postId as unknown as number;
        return res.json(await commentService.getByPostId(postId))
    } catch (error) {
      res.status(403).send(error.message)
    }
  })
  

export default commentRoutes

