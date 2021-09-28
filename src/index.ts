import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'
import { basename, resolve } from 'path'
import { OengusClient } from './lib/oengus-client'

async function printResultFromAPI(eventId: string) {
  const runs = await oengus.getRunsFromApi(eventId)
  const results = await oengus.getResults(eventId, runs)
  results.forEach(result => {
    console.log(result.formatted)
  })
}

async function printResultFromFile(file: string) {
  const path = resolve(__dirname, file)
  const runs = oengus.getRunsFromFile(path)

  const eventId = basename(path, path.substring(path.lastIndexOf('.')))
  const results = await oengus.getResults(eventId, runs)

  results.forEach(result => {
    console.log(result.formatted)
  })
}

const options = commandLineArgs([
  { name: 'submission-file', alias: 'f', type: String },
  { name: 'event-id', alias: 'e', type: String }
])

const submissionFile = options['submission-file']
const eventId = options['event-id']

const usage = commandLineUsage([
  {
    header: 'oengus-result-viewer',
    content: 'Views selection results of marathon on Oengus.'
  },
  {
    header: 'Options',
    content: '',
    optionList: [
      {
        name: 'submission-file',
        alias: 'f',
        typeLabel: '{underline file}',
        description: 'The JSON file fetched from submission API of Oengus. If specified with {bold --event-id}, {bold --submission-file} is prefered.'
      },
      {
        name: 'event-id',
        alias: 'e',
        description: 'The name of the event you want to display results. This option fetches submission data from Oengus API.'
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
  (async () => {
    await printResultFromFile(submissionFile)
  })()
} else if (eventId) {
  (async () => {
    await printResultFromAPI(eventId!)
  })()
}
