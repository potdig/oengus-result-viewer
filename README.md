# oengus-result-viewer
## Usage Example
```sh
# specify event ID (not recommended)
npm run view -- -e event-id

# with grep command
npm run view -- -e event-id | grep --color=never -E '(ACCEPT|BACKUP)'
```
