import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'
import { basename, resolve } from 'path'
import { OengusClient } from './lib/oengus-client'
import { viewResults, viewRuns } from './lib/terminal-util'

async function printFromAPI(eventId: string, submissionOnly: boolean = false) {
  const runs = await oengus.getRunsFromApi(eventId)
  if (submissionOnly) {
    viewRuns(runs)
    return
  }

  const results = await oengus.getResults(eventId, runs)
  viewResults(results)
}

async function printFromFile(file: string, submissionOnly: boolean = false) {
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

const options = commandLineArgs([
  { name: 'submission-file', alias: 'f', type: String },
  { name: 'event-id', alias: 'e', type: String },
  { name: 'submission-only', type: Boolean },
  { name: 'interactive', alias: 'i', type: Boolean}
])

const submissionFile: string = options['submission-file']
const eventId: string = options['event-id']
const submissionOnly: boolean = options['submission-only']
const interactive: boolean = options['interactive']

const usage = commandLineUsage([
  {
    header: 'oengus-result-viewer',
    content: 'Views selection results of marathon on Oengus.'
  },
  {
    header: 'Required Arguments',
    content: '',
    optionList: [
      {
        name: 'submission-file',
        alias: 'f',
        typeLabel: '{underline file}',
        description:
          'The JSON file fetched from submission API of Oengus. If specified with {bold --event-id}, {bold --submission-file} is prefered.'
      },
      {
        name: 'event-id',
        alias: 'e',
        description:
          'The name of the event you want to display results. This option fetches submission data from Oengus API.'
      }
    ]
  },
  {
    header: 'Options',
    content: '',
    optionList: [
      {
        name: 'submission-only',
        description: 'Views only submissions. (result is not viewed)'
      },
      {
        name: 'interactive',
        alias: 'i',
        description: 'Uses menu interface. You can choose run and view the detail.'
      }
    ]
  }
])

if (submissionFile && eventId) {
  console.log(usage)
  process.exit(1)
}

const oengus = new OengusClient()

if (submissionFile) {
  ;(async () => {
    await printFromFile(submissionFile, submissionOnly)
  })()
} else if (eventId) {
  ;(async () => {
    await printFromAPI(eventId!, submissionOnly)
  })()
}
