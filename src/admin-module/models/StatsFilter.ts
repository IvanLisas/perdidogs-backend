export class StatsFilter {
  constructor(init?: Partial<StatsFilter>) {
    Object.assign(this, init)
  }

  breed?: number
  dateFrom?: Date
  dateTo?: Date

  static fromJson(FilterJson: string): StatsFilter {
    return Object.assign(new StatsFilter(), FilterJson)
  }
}
