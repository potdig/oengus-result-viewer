export class Run {
  private _id: number;
  private _game: string;
  private _category: string;
  private _type: string;

  private _runners: Array<string>;

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

  get game() {
    return this._game
  }

  get category() {
    return this._category
  }

  get runners() {
    return this._runners
  }

  get formatted() {
    return `${this._game} / ${this._category} (${this.displayedType}) / ${this._runners.join(', ')}`
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
