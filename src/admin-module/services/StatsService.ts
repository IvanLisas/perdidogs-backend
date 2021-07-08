import { getRepository } from 'typeorm'
import { Alert } from '../../models/Alert'
import { Post } from '../../models/Post'
import { User } from '../../models/User'
import { PorcentajeAlertasActivasSobreInactivas } from '../models/PorcentajeAlertasActivasSobreInactivas'
import { PorcentajePostActivosSobreInactivos } from '../models/PorcentajePostActivosSobreInactivos'
import { PorcentajeUsuariosActivosSobreInactivos } from '../models/PorcentajeUsuariosActivosSobreInactivos'

class StatsService {
  calculoDePorcentajeDeUsuariosActivosSobreInactivos(usersActive: User[], usersInactive: User[]): PorcentajeUsuariosActivosSobreInactivos {
    const usuariosTotales = usersActive.length + usersInactive.length
    const porcentajeDeUsuariosActivos = (usersActive.length * 100) / usuariosTotales
    const porcentajeDeUsuariosInactivos = usuariosTotales - porcentajeDeUsuariosActivos

    return new PorcentajeUsuariosActivosSobreInactivos({ usuariosTotales: usuariosTotales, usuariosActivos: porcentajeDeUsuariosActivos, usuariosinactivos: porcentajeDeUsuariosInactivos })
  }

  calculoDePorcentajeDePostsActivosSobreInactivos(postsActive:Post[], postsInactive:Post[]):  PorcentajePostActivosSobreInactivos  {
  
    const postsTotales =  postsActive.length + postsInactive.length 
    const porcentajeDePostsActivos = postsActive.length *100/postsTotales
    const porcentajeDePostsInactivos =  postsTotales - porcentajeDePostsActivos

    return new PorcentajePostActivosSobreInactivos({postTotales:postsTotales, 
      postActivos:porcentajeDePostsActivos,
      postinactivos:porcentajeDePostsInactivos})
      }

      calculoDePorcentajeDeAlertasActivasSobreInactivas 
      (alertsActive:Alert[], alertsInactive:Alert[]):  PorcentajeAlertasActivasSobreInactivas  {
  
        const alertasTotales =  alertsActive.length + alertsInactive.length 
        const porcentajeDeAlertasActivas = alertsActive.length *100/alertasTotales
        const porcentajeDeAlertasInactivas =  alertasTotales - porcentajeDeAlertasActivas
    
        return new PorcentajeAlertasActivasSobreInactivas({alertasTotales:alertasTotales, 
          alertasActivos:porcentajeDeAlertasActivas,
          alertasInactivas:porcentajeDeAlertasInactivas})
          }
}


const statsService = new StatsService()
export default statsService
