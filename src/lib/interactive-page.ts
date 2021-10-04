import { config } from 'dotenv'
import TerminalMenu from 'simple-terminal-menu'
import { resolve } from 'path'
import { black, white } from 'colors'
import Terminal, { KeyboardEvent } from 'tty-events'
import { Run } from './types/run'
import { Page } from './types/page'

config({ path: resolve(process.cwd(), 'config.env') })

const menuWidth: number = parseInt(process.env['MENU_WIDTH'] ?? '80')
const pageSize: number = parseInt(process.env['PAGE_SIZE'] ?? '10')

export class InteractivePage {
  private readonly _runs: Array<Run>

  private get _pages() {
    return this._runs.reduce(
      (acc, val, index) =>
        index % pageSize
          ? acc
          : [
              ...acc,
              new Page(
                this._runs.slice(index, index + pageSize),
                Math.floor(index / pageSize)
              )
            ],
      [] as Array<Page>
    )
  }

  constructor(runs: Array<Run>) {
    this._runs = runs
  }

  view() {
    this._createListPage(0, 0)
  }

  private _createListPage(pageNumber: number, listIndex: number) {
    const page = this._pages[pageNumber]

    const menu = new TerminalMenu({
      width: menuWidth,
      bg: 'black',
      selected: listIndex
    })
    menu.writeLine(`Submissions ${pageNumber + 1} / ${this._pages.length}`)
    menu.writeSeparator()
    page.runs.forEach((run, index) => {
      menu.add(run.formatted, () => {
        this._createDetailPage(page.no, index)
      })
    })
    if (pageNumber > 0) {
      menu.add(' << BACK', () => {
        this._createListPage(pageNumber - 1, 0)
      })
    }
    if (pageNumber < this._pages.length - 1) {
      menu.add(' NEXT >>', () => {
        this._createListPage(pageNumber + 1, 0)
      })
    }
    return menu
  }

  private _createDetailPage(pageNumber: number, listIndex: number) {
    const runIndex = pageNumber * pageSize + listIndex
    const run = this._runs[runIndex]
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
    this._writeSubSection('EST', run.category.est)
    console.log('-------------------------')
    console.log('Enter : Leave the page')
    if (runIndex < this._runs.length - 1) {
      console.log('Right : View next run')
    }
    if (runIndex > 0) {
      console.log('Left  : View previous run')
    }
    this._waitForKey((key, term) => {
      if (key === 'enter') {
        this._createListPage(pageNumber, listIndex)
        term.removeAllListeners()
      } else if (key === 'right' && runIndex < this._runs.length - 1) {
        this._moveTo(runIndex + 1)
        term.removeAllListeners()
      } else if (key === 'left' && runIndex > 0) {
        this._moveTo(runIndex - 1)
        term.removeAllListeners()
      }
    })
  }

  private _moveTo(index: number) {
    const pageToMove = Math.floor(index / pageSize)
    const indexToMove = Math.floor(index % pageSize)
    this._createDetailPage(pageToMove, indexToMove)
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

  private _waitForKey(callback: (key: string, term: Terminal) => void) {
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true)
    }

    const term = new Terminal(process.stdin, process.stdout, {})

    term.addListener('keypress', (keyEvent: KeyboardEvent) => {
      callback(keyEvent.name, term)
    })
  }
}
