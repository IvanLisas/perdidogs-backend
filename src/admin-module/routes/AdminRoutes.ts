import { Router } from 'express'
import { Bootstrap } from '../../bootstrap/Bootstrap'
import postService from '../../services/PostService'
import userService from '../../services/UserService'
import { PostFilter } from '../models/PostFilter'

const adminRoutes = Router()
 
//nueva clase stats.ts
//nventar metodos para ver como encaminar eso

adminRoutes.put('/filterPosts', async (req, res) => {
    try {
      const filters= PostFilter.newFilter(req.body.breed, req.body.ownerEmail, req.body.createdFrom, req.body.createdTo, req.body.status,req.body.userStatus);
      return res.json(await postService.getPostByAdminFilters(filters))
    } catch (error) {
      res.send(error.message)
    }
  
})

export default adminRoutes
