import { basename, resolve } from 'path'
import { OengusClient } from './lib/oengus-client'
import { viewResults, viewResultsAsMenu, viewRuns, viewRunsAsMenu } from './lib/terminal-util'
import { Args } from './lib/types/args'
import { Run } from './lib/types/run'

async function main(args: Args) {
  const oengus = new OengusClient()

  let runs: Array<Run>
  let eventId: string
  if (args.submissionFile) {
    const path = resolve(__dirname, args.submissionFile)
    runs = await oengus.getRunsFromFile(path)
    eventId = basename(path, path.substring(path.lastIndexOf('.')))
  } else {
    runs = await oengus.getRunsFromApi(args.eventId)
    eventId = args.eventId
  }

  if (args.submissionOnly) {
    if (args.interactive) {
      viewRunsAsMenu(runs)
    } else {
      viewRuns(runs)
    }
    return
  }

  const results = await oengus.getResults(eventId, runs)
  if (args.interactive) {
    viewResultsAsMenu(results)
  }
  viewResults(results)
}

export default main
