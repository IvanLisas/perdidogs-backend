import { Router } from 'express'
import { Filter } from '../../models/Filter'
import postRoutes from '../../routes/PostRoutes'
import postService from '../../services/PostService'
import userService from '../../services/UserService'
import { PostFilter } from '../models/PostFilter'

const adminRoutes = Router()

//nueva clase stats.ts
//nventar metodos para ver como encaminar eso

adminRoutes.put('/filterPosts', async (req, res) => {
  try {
    const filters = req.body as PostFilter
    console.log(req.body)
    return res.json(await postService.getPostByAdminFilters(filters))
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message)
  }
})

adminRoutes.put('/login', async (req, res) => {
  try {
    res.json(await userService.loginAdmin(req.body.email, req.body.password))
  } catch (error) {
    res.status(403).send(error.message)
  }
})

export default adminRoutes
