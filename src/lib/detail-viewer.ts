import { black, white } from 'colors'
import { KeyWaiter } from './key-waiter'
import { Formattable } from './types/formattable'
import { Result } from './types/result'
import { Run } from './types/run'

export class DetailViewer {
  private _data: Array<Formattable>
  private _index: number

  constructor(data: Array<Formattable>, index: number) {
    this._data = data
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
      if (this._index < this._data.length - 1) {
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
    const datum = this._data[this._index]
    const run = datum instanceof Result ? (datum as Result).run : (datum as Run)
    console.clear()
    if (datum instanceof Result) {
      this._writeMainSection('STATUS', datum.statusLabel ?? 'TODO')
    }
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
    if (this._index < this._data.length - 1) {
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
