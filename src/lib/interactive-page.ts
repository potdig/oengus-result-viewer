import { config } from 'dotenv'
import TerminalMenu from 'simple-terminal-menu'
import { resolve } from 'path'
import { Run } from './types/run'

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
          : [...acc, this._runs.slice(index, index + pageSize)],
      [] as Array<Array<Run>>
    )
  }

  constructor(runs: Array<Run>) {
    this._runs = runs
  }

  view() {
    this._createListPage(0)
  }

  private _createListPage(index: number) {
    const page = this._pages[index]

    const menu = new TerminalMenu({
      width: menuWidth,
      bg: 'black'
    })
    menu.writeLine(`Submissions ${index + 1} / ${this._pages.length}`)
    menu.writeSeparator()
    page.forEach((run) => {
      menu.add(run.formatted, () => {
        console.log(`Selected ID: ${run.id}`)
      })
    })
    if (index > 0) {
      menu.add(' << BACK', () => {
        this._createListPage(index - 1)
      })
    }
    if (index < this._pages.length - 1) {
      menu.add(' NEXT >>', () => {
        this._createListPage(index + 1)
      })
    }
    return menu
  }
}
