import { cyan, green, red, white, yellow } from 'colors'
import { Run } from './run'

export class Result {
  private _status: string
  private _run?: Run

  constructor(status: string, run?: Run) {
    this._status = status
    this._run = run
  }

  get formatted() {
    return `${this._statusLabel} ${white(this._run?.formatted ?? 'No run found')}`
  }

  private get _statusLabel() {
    return {
      VALIDATED:  green.inverse (' ACCEPT '),
      REJECTED:   red           (' REJECT '),
      BACKUP:     cyan.inverse  (' BACKUP '),
      BONUS:      yellow.inverse('  BONUS ')
    }[this._status]
  }
}
