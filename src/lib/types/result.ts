import { cyan, gray, green, red, yellow } from 'colors'
import { Formattable } from './formattable'
import { Run } from './run'

export class Result implements Formattable {
  private _status: string
  private _run: Run

  constructor(status: string, run: Run) {
    this._status = status
    this._run = run
  }

  public get formatted() {
    return `${this.statusLabel} ${gray(this._run?.formatted ?? 'No run found')}`
  }

  public get status() {
    return this._status
  }

  public get run() {
    return this._run
  }

  public get statusLabel() {
    return {
      VALIDATED:  green.inverse (' ACCEPT '),
      REJECTED:   red           (' REJECT '),
      BACKUP:     cyan.inverse  (' BACKUP '),
      BONUS:      yellow.inverse('  BONUS ')
    }[this._status]
  }
}
