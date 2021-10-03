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
  const menu = new TerminalMenu({
    bg: 'black'
  })
  menu.writeLine('Submissions')
  menu.writeSeparator()
  runs.forEach((run) => {
    menu.add(run.formatted, () => {
      console.log(`Selected ID: ${run.id}`)
    })
  })
}

export { viewRuns, viewResults, viewRunsAsMenu }
