export class ActiveOverInactivePercent {
  constructor(init?: Partial<ActiveOverInactivePercent>) {
    Object.assign(this, init)
  }

  total?: number
  activePercent?: number
  inactivePercent?: number

  static fromJson(FilterJson: string): ActiveOverInactivePercent {
    return Object.assign(new ActiveOverInactivePercent(), FilterJson)
  }
}
