export class Run {
  private _id: number
  private _game: string
  private _category: string
  private _type: string
  private _runners: Array<string>

  constructor(
    id: number,
    game: string,
    category: string,
    type: string,
    runners: Array<string>
  ) {
    this._id = id
    this._game = game
    this._category = category
    this._type = type
    this._runners = runners
  }

  get id() {
    return this._id
  }

  get formatted() {
    return `${this._game} / ${this._category} (${this._displayedType}) / ${this._runners.join(', ')}`
  }

  private get _displayedType() {
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
