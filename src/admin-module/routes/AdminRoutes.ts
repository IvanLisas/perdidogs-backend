import { Router } from 'express'
import { Bootstrap } from '../../bootstrap/Bootstrap'
import postService from '../../services/PostService'
import userService from '../../services/UserService'
import { PostFilter } from '../models/PostFilter'

const adminRoutes = Router()

adminRoutes.put('/approve-user/:userId', async (req, res) => {
  const id = parseInt(req.params.userId)
  try {
    const user = await userService.get(id)
    user.userStatus = Bootstrap.alertStatusInActivo
    res.json(await userService.update(user))
  } catch (error) {
    res.send(error.message)
  }

  adminRoutes.put('/filterPosts', async (req, res) => {
    try {
      const filters= PostFilter.newFilter(req.body.breed, req.body.ownerEmail, req.body.createdFrom, req.body.createdTo, req.body.postStatus,req.body.userStatus);
      return res.json(await postService.getPostByAdminFilters(filters))
    } catch (error) {
      res.send(error.message)
    }
  })
})

export default adminRoutes
