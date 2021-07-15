import { Router } from 'express'
import alertService from '../services/AlertService'

const alertRoutes = Router()

alertRoutes.get('/:alertId', async (req, res) => {
  const id = parseInt(req.params.alertId)
  try {
    res.json(await alertService.get(id))
  } catch (error) {
    res.send(error.message)
  }
})

alertRoutes.put('/', async (req, res) => {
  try {
    return res.json(await alertService.update(req.body))
  } catch (error) {
    res.send(error.message)
  }
})

alertRoutes.post('/', async (req, res) => {
  try {
    return res.json(await alertService.create(req.body))
  } catch (error) {
    res.send(error.message)
  }
})

alertRoutes.delete('/:alertId', async (req, res) => {
  try {
    const id = parseInt(req.params.alertId)
    return res.json(alertService.delete(id))
  } catch (error) {
    res.send(error.message)
  }
})

alertRoutes.get('/:userId', async (req, res) => {
  try {
    const id = parseInt(req.params.userId)
    return res.json(alertService.match(id, req.body))
  } catch (error) {
    res.send(error.message)
  }
})

export default alertRoutes

