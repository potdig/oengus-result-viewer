export class Game {
  private _name: string
  private _platform: string
  private _description: string

  constructor(name: string, platform: string, description: string) {
    this._name = name
    this._platform = platform
    this._description = description
  }

  public get name() {
    return this._name
  }

  public get platform() {
    return this._platform
  }

  public get description() {
    return this._description
  }
}
