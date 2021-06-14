import { EntityRepository, Repository } from 'typeorm'
import { Alert } from '../models/Alert'

@EntityRepository(Alert)
export class RepoAlert extends Repository<Alert> {

  async allAlerts() {
    try {
      return await this.find()
    } catch (e) {
      console.log(e)
    }
  }

  async searchByid(id: number) {
    return await this.findOneOrFail(id)
  }

  async anyAlerts() {
    try {
      return (await this.count()) == 0
    } catch (e) {
      console.log(e)
    }
  }

  async saveAlert(alert: Alert) {
    try {
      await this.save(alert)
    } catch (e) {
      console.log(e)
    }
  }

}
