import { Router } from 'express'
import { Bootstrap } from '../../bootstrap/Bootstrap'
import userService from '../../services/UserService'

const adminRoutes = Router()

adminRoutes.put('/approve-user/:userId', async (req, res) => {
  const id = parseInt(req.params.userId)
  try {
    const user= await userService.get(id)
    user.userStatus= Bootstrap.alertStatusInActivo
    res.json(await userService.update(user))
  } catch (error) {
    res.send(error.message)
  }
})



export default adminRoutes

