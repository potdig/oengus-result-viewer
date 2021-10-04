import { config } from 'dotenv'
import TerminalMenu from 'simple-terminal-menu'
import { resolve } from 'path'
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
    this._createListPage(0)
  }

  private _createListPage(pageNumber: number) {
    const page = this._pages[pageNumber]

    const menu = new TerminalMenu({
      width: menuWidth,
      bg: 'black'
    })
    menu.writeLine(`Submissions ${pageNumber + 1} / ${this._pages.length}`)
    menu.writeSeparator()
    page.runs.forEach((run, index) => {
      menu.add(run.formatted, () => {
        this._createDetailPage(run, page.no, index)
      })
    })
    if (pageNumber > 0) {
      menu.add(' << BACK', () => {
        this._createListPage(pageNumber - 1)
      })
    }
    if (pageNumber < this._pages.length - 1) {
      menu.add(' NEXT >>', () => {
        this._createListPage(pageNumber + 1)
      })
    }
    return menu
  }

  private _createDetailPage(run: Run, pageNumber: number, listIndex: number) {
    const menu = new TerminalMenu({
      width: menuWidth,
      bg: 'black'
    })
    menu.writeLine(`Detail for ID: ${run.id} will be here.`)
    menu.writeSeparator()
    menu.add('< BACK TO THE SUBMISSION LIST', () => {
      this._createListPage(pageNumber)
    })
  }
}
