export class Count {
    constructor(init?: Partial<Count>) {
      Object.assign(this, init)
    }
  
    Id?: number
    description?: string
    count!: number

    static fromJson(FilterJson: string): Count {
      return Object.assign(new Count(), FilterJson)
    }
  }
  