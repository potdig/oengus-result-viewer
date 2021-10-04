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
}
