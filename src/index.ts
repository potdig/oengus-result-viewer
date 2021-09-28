import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'
import { OengusClient } from './lib/oengus-client'

async function printResultFromAPI(eventId: string) {
  const runs = await oengus.getRunsFromApi(eventId)
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
  // TODO
  console.log('not implemented')
} else if (eventId) {
  (async () => {
    await printResultFromAPI(eventId!)
  })()
}
