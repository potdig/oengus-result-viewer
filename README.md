# oengus-result-viewer
Views selection results of marathon on Oengus.
## Options
| Option Name | Description |
| ----------- | ----------- |
| `--submission-file=file`, `-f` | The JSON file fetched from submission API of Oengus. **The file name is needed to be format of `[event-id].json`.** If specified with `--event-id`, this option is prefered. |
| `--event-id=string`, `-e` | The name of the event you want to display results. This option fetches submission data from Oengus API. |
## Usage Example
```sh
# load submissions from JSON file (recommended)
npm run view -- -f ./event-id.json

# fetch submissions from API with event ID
npm run view -- -e event-id

# with grep command
npm run view -- -e event-id | grep --color=never -E '(ACCEPT|BACKUP)'
```
