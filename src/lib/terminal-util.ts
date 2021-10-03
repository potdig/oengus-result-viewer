import { Result } from './types/result'
import { Run } from './types/run'
import TerminalMenu from 'simple-terminal-menu'

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
  const pageSize = 10
  const pages = runs.reduce(
    (acc, val, index) =>
      index % pageSize ? acc : [...acc, runs.slice(index, index + pageSize)],
    [] as Array<Array<Run>>
  )

  createMenu(pages, 0)
}

function createMenu(pages: Array<Array<Run>>, index: number) {
  const page = pages[index]

  const menu = new TerminalMenu({
    width: 120,
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
      createMenu(pages, index - 1)
    })
  }
  if (index < pages.length - 1) {
    menu.add(' NEXT >>', () => {
      createMenu(pages, index + 1)
    })
  }
  return menu
}

export { viewRuns, viewResults, viewRunsAsMenu }
