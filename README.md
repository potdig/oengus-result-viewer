# oengus-result-viewer
Views selection results of marathon on Oengus.

## Required Arguments
| Name | Description |
| ---- | ----------- |
| `--submission-file=file`, `-f` | The JSON file fetched from submission API of Oengus. **The file name is needed to be format of `[event-id].json`.** If specified with `--event-id`, this option is prefered. |
| `--event-id=string`, `-e` | The name of the event you want to display results. This option fetches submission data from Oengus API. |

## Options
| Name | Description |
| ---- | ----------- |
| `--submission-only` | Views only submissions. (result is not viewed) |
| `--interactive`, `-i` | Uses menu interface. You can choose run and view the detail. |

## Configuration
Written in `config.env`.
| Name | Description |
| ---- | ----------- |
| `MENU_WIDTH` | Width of menu in the `--interactive` mode. |
| `PAGE_SIZE` | Maximum submission count in the list page in the `--interactive` mode. |

## Usage Example
```sh
# load submissions from JSON file (recommended)
npm run view -- -f ./event-id.json

# fetch submissions from API with event ID
npm run view -- -e event-id

# with grep command
npm run view -- -e event-id | grep --color=never -E '(ACCEPT|BACKUP)'
```
