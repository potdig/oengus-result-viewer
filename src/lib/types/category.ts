export class Category {
  private _name: string
  private _est: string
  private _description: string
  private _type: string

  constructor(name: string, est: string, description: string, type: string) {
    this._name = name
    this._est = est
    this._description = description
    this._type = type
  }

  public get name() {
    return this._name
  }

  public get est() {
    return this._est
  }

  public get description() {
    return this._description
  }

  public get type() {
    return this._type
  }

  public get formattedEst() {
    const fields = this.est.match(/PT([0-9]+H)?([0-9]+M)?([0-9]+S)?/)?.slice(1)
    if (!fields) {
      return 'Unknown'
    }

    const hour = fields.find((s) => this.endsWith('H', s))?.replace('H', '')
    const minutes = fields.find((s) => this.endsWith('M', s))?.replace('M', '')
    const seconds = fields.find((s) => this.endsWith('S', s))?.replace('S', '')
    return `${hour ?? '0'}:${minutes?.padStart(2, '0') ?? '00'}:${
      seconds?.padStart(2, '0') ?? '00'
    }`
  }

  public get displayedType() {
    return {
      SINGLE: 'Single Run',
      RACE: 'Race',
      COOP: 'Co-op Run',
      COOP_RACE: 'Co-op Race',
      RELAY: 'Relay',
      RELAY_RACE: 'Relay Race'
    }[this._type]
  }

  private endsWith = (str: string, target: string) =>
    RegExp(`.+${str}`).test(target)
}
