import { Result } from './types/result'
import { Run } from './types/run'
import { InteractivePage } from './interactive-page'

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
  const page = new InteractivePage(runs)
  page.view()
}

function viewResultsAsMenu(results: Array<Result>) {
  const page = new InteractivePage(results)
  page.view()
}

export { viewRuns, viewResults, viewRunsAsMenu, viewResultsAsMenu }
