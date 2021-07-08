import { Router } from "express";
import alertService from "../../services/AlertService";
import postService from "../../services/PostService";
import userService from "../../services/UserService";
import statsService from "../services/StatsService";

const statsRoutes = Router()

statsRoutes.put('/stats/porcentajeUsuariosActivosSobreInactivos', async (req, res) => {
  try {
    const activeUsers = await userService.getUsersByStatus(1)
    const inactiveUsers = await userService.getUsersByStatus(2)
    return res.json(  statsService.calculoDePorcentajeDeUsuariosActivosSobreInactivos(activeUsers,inactiveUsers ))
    
  } catch (error) {
    res.send(error.message)
  }

})

statsRoutes.put('/stats/porcentajePostActivosSobreInactivos', async (req, res) => {
  try {
    const activePost = await postService.getPostsByStatus(1)
    const inactivePost = await postService.getPostsByStatus(2)
    return res.json(  statsService.calculoDePorcentajeDePostsActivosSobreInactivos(activePost,inactivePost ))
    
  } catch (error) {
    res.send(error.message)
  }

})

statsRoutes.put('/stats/porcentajeDeRazasPerdidas', async (req, res) => {
  try {
    const activePost = await postService.getPostsByStatus(1)
    const inactivePost = await postService.getPostsByStatus(2)
    return res.json(  statsService.calculoDePorcentajeDePostsActivosSobreInactivos(activePost,inactivePost ))
    
  } catch (error) {
    res.send(error.message)
  }

})

statsRoutes.put('/stats/porcentajeDeAlertasActivasSobreInactivas', async (req, res) => {
  try {
    const activeAlert = await alertService.getAlertsByStatus(1)
    const inactiveAlert = await alertService.getAlertsByStatus(2)
    return res.json(  statsService.calculoDePorcentajeDeAlertasActivasSobreInactivas(activeAlert,inactiveAlert ))
    
  } catch (error) {
    res.send(error.message)
  }

})



export default statsRoutes