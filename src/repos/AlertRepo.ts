import { EntityRepository, Repository } from 'typeorm'
import { Alert } from '../models/Alert'

@EntityRepository(Alert)
export class AlertRepo extends Repository<Alert> {}