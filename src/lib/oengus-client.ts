import fetch from 'node-fetch'
import { Selection, Submission, User } from './types/response-types'
import { Run } from './types/run'
import { Result } from './types/result'

export class OengusClient {
  async getRuns(eventId: string) {
    const response = await fetch(
      `https://oengus.io/api/marathons/${eventId}/submissions`
    )
    const submissions = (await response.json()) as Array<Submission>

    return submissions.flatMap((submission) => {
      return submission.games.flatMap((game) => {
        return game.categories.map((category) => {
          return new Run(category.id, game.name, category.name, category.type, [
            this._availableUserNamefor(submission.user),
            ...category.opponentDtos
              .map((opponent) => opponent.user)
              .map((user) => this._availableUserNamefor(user))
          ])
        })
      })
    })
  }

  async getResults(eventId: string, runs: Array<Run>) {
    const url = new URL(`https://oengus.io/api/marathons/${eventId}/selections`)
    const response = await fetch(url.href)
    const selectionsObj = (await response.json()) as object
    const selections = Object.values(selectionsObj) as Array<Selection>

    return selections.map(selection => new Result(
      selection.status,
      runs.find(run => run.id === selection.categoryId)
    ))
  }

  private _availableUserNamefor = (user: User) =>
    user.usernameJapanese ? user.usernameJapanese : user.username
}
