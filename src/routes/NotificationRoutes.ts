import { Router } from 'express'
import notificationService from '../services/NotificationService'

const notificationRoutes = Router()

notificationRoutes.get('/by-user-id/:userId', async (req, res) => {
  try {
    const id = parseInt(req.params.userId)
    res.json(await notificationService.getNotificationDtosByUserId(id))
  } catch (error) {
    res.send(error.message)
  }
})

notificationRoutes.put('/read', async (req, res) => {
  try {
    const postId= parseInt(req.body.postId)
    return res.json(await notificationService.markAsRead(postId))
  } catch (error) {
    res.send(error.message)
  }
})

notificationRoutes.put('/reject', async (req, res) => {
    try {
      const postId= parseInt(req.body.postId)
      return res.json(await notificationService.markAsRejected(postId))
    } catch (error) {
      res.send(error.message)
    }
  })

export default notificationRoutes

