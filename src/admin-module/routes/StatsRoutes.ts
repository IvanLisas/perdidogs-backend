import { Router } from 'express'
import alertService from '../../services/AlertService'
import postService from '../../services/PostService'
import userService from '../../services/UserService'
import statsService from '../services/StatsService'

const statsRoutes = Router()

statsRoutes.put('/porcentajeUsuariosActivosSobreInactivos', async (req, res) => {
  try {
    const filter = req.body.filter
    const activeUsers = await userService.getUsersByStatus(1, filter)
    const inactiveUsers = await userService.getUsersByStatus(2, filter)
    return res.json(statsService.calculoDePorcentajeDeUsuariosActivosSobreInactivos(activeUsers, inactiveUsers))
  } catch (error) {
    res.status(403).send(error.message)
  }
})

statsRoutes.put('/calculatePostLostBreeds', async (req, res) => {
  try {
    const filter = req.body.filter
    return res.json(await statsService.calculatePostLostBreeds(filter))
  } catch (error) {
    res.status(403).send(error.message)
  }
})

statsRoutes.put('/calculateAlertLostBreeds', async (req, res) => {
  try {
    const filter = req.body.filter
    return res.json(await statsService.calculateAlertLostBreeds(filter))
  } catch (error) {
    res.status(403).send(error.message)
  }
})

statsRoutes.put('/calculatePostStatus', async (req, res) => {
  try {
    const filter = req.body.filter
    return res.json(await statsService.calculatePostStatus(filter))
  } catch (error) {
    res.status(403).send(error.message)
  }
})

statsRoutes.put('/porcentajePostActivosSobreInactivos', async (req, res) => {
  try {
    const filter = req.body.filter
    const activePost = await postService.getPostsByStatus(1, filter)
    const inactivePost = await postService.getPostsByStatus(2, filter)
    return res.json(statsService.calculoDePorcentajeDePostsActivosSobreInactivos(activePost, inactivePost))
  } catch (error) {
    res.status(403).send(error.message)
  }
})

statsRoutes.put('/porcentajeDeRazasPerdidas', async (req, res) => {
  try {
    const filter = req.body.filter
    const activePost = await postService.getPostsByStatus(1, filter)
    const inactivePost = await postService.getPostsByStatus(2, filter)
    return res.json(statsService.calculoDePorcentajeDePostsActivosSobreInactivos(activePost, inactivePost))
  } catch (error) {
    res.status(403).send(error.message)
  }
})

statsRoutes.put('/porcentajeDeAlertasActivasSobreInactivas', async (req, res) => {
  try {
    const filter = req.body.filter
    console.log('FILTER', filter)
    const activeAlert = await alertService.getAlertsByStatus(1, filter)
    const inactiveAlert = await alertService.getAlertsByStatus(2, filter)
    return res.json(statsService.calculoDePorcentajeDeAlertasActivasSobreInactivas(activeAlert, inactiveAlert))
  } catch (error) {
    res.status(403).send(error.message)
  }
})

statsRoutes.put('/statFalopa', async (req, res) => {
  try {
    return res.json(statsService.statFalopa())
  } catch (error) {
    res.send(error.message)
  }
})

export default statsRoutes
