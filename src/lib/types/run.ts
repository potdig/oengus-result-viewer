import { Category } from './category'
import { Formattable } from './formattable'
import { Game } from './game'

export class Run implements Formattable {
  private _id: number
  private _game: Game
  private _category: Category

  private _runners: Array<string>

  constructor(
    id: number,
    game: Game,
    category: Category,
    runners: Array<string>
  ) {
    this._id = id
    this._game = game
    this._category = category
    this._runners = runners
  }

  public get id() {
    return this._id
  }

  public get game() {
    return this._game
  }

  public get category() {
    return this._category
  }

  public get runners() {
    return this._runners
  }

  public get formatted() {
    return `${this._game.name} / ${this._category.name} (${
      this._category.displayedType
    }) / ${this._runners.join(', ')}`
  }
}
