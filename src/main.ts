import { basename, resolve } from 'path'
import { OengusClient } from './lib/oengus-client'
import { viewResults, viewRuns } from './lib/terminal-util'
import { Args } from './lib/types/args'

function main(args: Args) {
  if (args.submissionFile) {
    ;(async () => {
      await printFromFile(args.submissionFile, args.submissionOnly)
    })()
  } else if (args.eventId) {
    ;(async () => {
      await printFromAPI(args.eventId, args.submissionOnly)
    })()
  }
}

async function printFromAPI(eventId: string, submissionOnly: boolean = false) {
  const oengus = new OengusClient()
  const runs = await oengus.getRunsFromApi(eventId)
  if (submissionOnly) {
    viewRuns(runs)
    return
  }

  const results = await oengus.getResults(eventId, runs)
  viewResults(results)
}

async function printFromFile(file: string, submissionOnly: boolean = false) {
  const oengus = new OengusClient()
  const path = resolve(__dirname, file)
  const runs = oengus.getRunsFromFile(path)

  if (submissionOnly) {
    viewRuns(runs)
    return
  }

  const eventId = basename(path, path.substring(path.lastIndexOf('.')))
  const results = await oengus.getResults(eventId, runs)
  viewResults(results)
}

export default main
