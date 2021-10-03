import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'
import main from './main'

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

if (!submissionFile && !eventId) {
  console.log(usage)
  process.exit(1)
}

main({
  submissionFile,
  eventId,
  submissionOnly,
  interactive
})
