import { black, white } from 'colors'
import { KeyWaiter } from './key-waiter'
import { Run } from './types/run'

export class DetailViewer {
  private _runs: Array<Run>
  private _index: number

  constructor(runs: Array<Run>, index: number) {
    this._runs = runs
    this._index = index
  }

  public launch(callbackForEnter: (index: number) => void) {
    this._printDetail()
    const keyWaiter = new KeyWaiter()

    keyWaiter.addKey('enter', (terminal) => {
      terminal.removeAllListeners()
      callbackForEnter(this._index)
    })

    keyWaiter.addKey('right', () => {
      if (this._index < this._runs.length - 1) {
        this._index++
        this._printDetail()
      }
    })

    keyWaiter.addKey('left', () => {
      if (this._index > 0) {
        this._index--
        this._printDetail()
      }
    })

    keyWaiter.waitForKey()
  }

  private _printDetail() {
    const run = this._runs[this._index]
    console.clear()
    this._writeMainSection(
      'GAME',
      `${run.game.name} (${run.game.platform})`,
      run.game.description
    )
    this._writeMainSection(
      'CATEGORY',
      `${run.category.name} (${run.category.displayedType})`,
      run.category.description
    )
    this._writeSubSection(
      run.runners.length > 1 ? 'RUNNERS' : 'RUNNER',
      run.runners.join('\n')
    )
    this._writeSubSection('EST', run.category.formattedEst)

    console.log('------------------------------')
    console.log('Enter: Back to submission list')
    if (this._index < this._runs.length - 1) {
      console.log('Right : View next run')
    }
    if (this._index > 0) {
      console.log('Left  : View previous run')
    }
  }

  private _writeMainSection(header: String, ...contents: Array<String>) {
    console.log(this._header1(` ${header} `))
    console.log()
    contents.forEach((content) => {
      console.log(content)
      console.log()
    })
  }

  private _writeSubSection(header: String, contents: string) {
    console.log(this._header2(`${header}`))
    console.log(contents)
    console.log()
  }

  private _header1 = (str: string) => black.bgWhite.bold(str)
  private _header2 = (str: string) => white.underline.bold(str)
}
