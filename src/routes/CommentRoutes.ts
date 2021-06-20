import { Router } from 'express'
import { Comment } from '../models/Comment'
import commentService from '../services/CommentService'

const commentRoutes = Router()

commentRoutes.post('/', async (req, res) => {
  try {
    return await commentService.save(req.body as Comment)
  } catch (error) {
    res.status(403).send(error.message)
  }
})

export default commentRoutes

