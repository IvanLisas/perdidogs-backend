export class Stat {
  constructor(init?: Partial<Stat>) {
    Object.assign(this, init)
  }

  Id!: number
  description!: string
  percent!: number
  count!:number

  static fromJson(FilterJson: string): Stat {
    return Object.assign(new Stat(), FilterJson)
  }
}
