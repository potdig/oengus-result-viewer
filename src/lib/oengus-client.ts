import fetch from 'node-fetch'
import { Submission, User } from './types/response-types'
import { Run } from './types/run'

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

  private _availableUserNamefor = (user: User) =>
    user.usernameJapanese ? user.usernameJapanese : user.username
}
