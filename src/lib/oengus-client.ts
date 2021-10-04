import fetch from 'node-fetch'
import { Selection, Submission, User } from './types/response-types'
import { Run } from './types/run'
import { Result } from './types/result'
import { Game } from './types/game'
import { Category } from './types/category'

export class OengusClient {
  async getRunsFromApi(eventId: string) {
    console.log('Fetching submissions from API...')
    const response = await fetch(
      `https://oengus.io/api/marathons/${eventId}/submissions`
    )
    if (!response.ok) {
      throw new Error(`API respond ${response.status}. ${response.statusText}`)
    }
    const submissions = (await response.json()) as Array<Submission>
    return this._convertToResult(submissions)
  }

  getRunsFromFile(file: string) {
    console.log('Loading submissions from file...')
    const submissions = require(file) as Array<Submission>
    return this._convertToResult(submissions)
  }

  async getResults(eventId: string, runs: Array<Run>) {
    console.log('Fetching selections from API...')
    const url = new URL(`https://oengus.io/api/marathons/${eventId}/selections`)
    const response = await fetch(url.href)
    if (!response.ok) {
      throw new Error(`API respond ${response.status}. ${response.statusText}`)
    }
    const selectionsObj = (await response.json()) as object
    const selections = Object.values(selectionsObj) as Array<Selection>

    return selections.map(
      (selection) =>
        new Result(
          selection.status,
          runs.find((run) => run.id === selection.categoryId)
        )
    )
  }

  private _convertToResult = (submissions: Array<Submission>) =>
    submissions.flatMap((submission) => {
      return submission.games.flatMap((game) => {
        return game.categories.map((category) => {
          return new Run(
            category.id,
            new Game(game.name, game.console, game.description),
            new Category(category.name, category.estimate, category.description, category.type),
            [
              this._availableUserNamefor(submission.user),
              ...category.opponentDtos
                .map((opponent) => opponent.user)
                .map((user) => this._availableUserNamefor(user))
            ]
          )
        })
      })
    })

  private _availableUserNamefor = (user: User) =>
    user.usernameJapanese ? user.usernameJapanese : user.username
}
