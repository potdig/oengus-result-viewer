import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'
import { basename, resolve } from 'path'
import { OengusClient } from './lib/oengus-client'

async function printFromAPI(eventId: string, submissionOnly: boolean = false) {
  const runs = await oengus.getRunsFromApi(eventId)
  if (submissionOnly) {
    runs.forEach((run) => {
      console.log(run.formatted)
    })
    return
  }

  const results = await oengus.getResults(eventId, runs)
  results.forEach((result) => {
    console.log(result.formatted)
  })
}

async function printFromFile(file: string, submissionOnly: boolean = false) {
  const path = resolve(__dirname, file)
  const runs = oengus.getRunsFromFile(path)

  if (submissionOnly) {
    runs.forEach((run) => {
      console.log(run.formatted)
    })
    return
  }

  const eventId = basename(path, path.substring(path.lastIndexOf('.')))
  const results = await oengus.getResults(eventId, runs)

  results.forEach((result) => {
    console.log(result.formatted)
  })
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
