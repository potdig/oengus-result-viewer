import { Run } from './run'

export class Result {
  private _status: string
  private _run?: Run

  constructor(status: string, run?: Run) {
    this._status = status
    this._run = run
  }
}
