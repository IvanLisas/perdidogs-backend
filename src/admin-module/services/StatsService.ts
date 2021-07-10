import { Alert } from '../../models/Alert'

import { Post } from '../../models/Post'
import { User } from '../../models/User'
import { PostRepo } from '../../repos/PostRepo'
import { ActiveOverInactivePercent } from '../models/ActiveOverInactivePercent'
import { Stat } from '../models/Stat'

class StatsService {
  calculoDePorcentajeDeUsuariosActivosSobreInactivos(usersActive: User[], usersInactive: User[]): ActiveOverInactivePercent {
    const usuariosTotales = usersActive.length + usersInactive.length
    const porcentajeDeUsuariosActivos = this.calculatePercent(usuariosTotales, usersActive.length)
    const porcentajeDeUsuariosInactivos = this.calculatePercent(usuariosTotales, usersInactive.length)
    return new ActiveOverInactivePercent({ total: usuariosTotales, activePercent: porcentajeDeUsuariosActivos, inactivePercent: porcentajeDeUsuariosInactivos })
  }

  calculoDePorcentajeDePostsActivosSobreInactivos(postsActive: Post[], postsInactive: Post[]): ActiveOverInactivePercent {
    const postsTotales = postsActive.length + postsInactive.length
    const porcentajeDePostsActivos = this.calculatePercent(postsTotales, postsActive.length)
    const porcentajeDePostsInactivos = this.calculatePercent(postsTotales, postsInactive.length)
    return new ActiveOverInactivePercent({ total: postsTotales, activePercent: porcentajeDePostsActivos, inactivePercent: porcentajeDePostsInactivos })
  }

  calculoDePorcentajeDeAlertasActivasSobreInactivas(activeAlerts: Alert[], inactiveAlerts: Alert[]): ActiveOverInactivePercent {
    const totalAlerts = activeAlerts.length + inactiveAlerts.length
    const activeAlertsPercent = this.calculatePercent(totalAlerts, activeAlerts.length)
    const inactiveAlertsPercent = this.calculatePercent(totalAlerts, inactiveAlerts.length)
    return new ActiveOverInactivePercent({ total: totalAlerts, activePercent: activeAlertsPercent, inactivePercent: inactiveAlertsPercent })
  }

  async calculateLostBreeds(): Promise<Stat[]> {
    const counts = await PostRepo.countLostBreeds()
    //calculo la cantidad de mascotas que hay sumando los de cada raza
    const totals = counts.map((x) => Number.parseInt(x.count.toString())).reduce((acum: number, item: number) => acum + item)
    //calculo el porcentaje de cada raza y lo meto en una lista de tipo Stat para retornarlo
    return counts.map((x) => new Stat({Id: x.Id, description: x.description, percent: this.calculatePercent(totals, x.count), count: x.count }))
  }

  calculatePercent(total: number, part: number): number {
    return (part * 100) / total
  }
}

const statsService = new StatsService()
export default statsService
