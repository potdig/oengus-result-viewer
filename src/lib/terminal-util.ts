import { Result } from './types/result'
import { Run } from './types/run'
import TerminalMenu from 'simple-terminal-menu'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), 'config.env') })

const menuWidth: number = parseInt(process.env['MENU_WIDTH'] ?? '80')
const pageSize: number = parseInt(process.env['PAGE_SIZE'] ?? '10')

function viewRuns(runs: Array<Run>) {
  runs.forEach((run) => {
    console.log(run.formatted)
  })
}

function viewResults(results: Array<Result>) {
  results.forEach((result) => {
    console.log(result.formatted)
  })
}

function viewRunsAsMenu(runs: Array<Run>) {
  const pages = runs.reduce(
    (acc, val, index) =>
      index % pageSize ? acc : [...acc, runs.slice(index, index + pageSize)],
    [] as Array<Array<Run>>
  )

  createListPage(pages, 0)
}

function createListPage(pages: Array<Array<Run>>, index: number) {
  const page = pages[index]

  const menu = new TerminalMenu({
    width: menuWidth,
    bg: 'black'
  })
  menu.writeLine(`Submissions ${index + 1} / ${pages.length}`)
  menu.writeSeparator()
  page.forEach((run) => {
    menu.add(run.formatted, () => {
      console.log(`Selected ID: ${run.id}`)
    })
  })
  if (index > 0) {
    menu.add(' << BACK', () => {
      createListPage(pages, index - 1)
    })
  }
  if (index < pages.length - 1) {
    menu.add(' NEXT >>', () => {
      createListPage(pages, index + 1)
    })
  }
  return menu
}

export { viewRuns, viewResults, viewRunsAsMenu }
