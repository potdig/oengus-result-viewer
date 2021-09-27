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
}
