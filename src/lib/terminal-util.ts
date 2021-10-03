import { Result } from './types/result'
import { Run } from './types/run'

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

export {
  viewRuns,
  viewResults
}
