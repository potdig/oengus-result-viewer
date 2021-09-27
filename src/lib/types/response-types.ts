class Submission {
  user: User
  games: Array<Game>
}

class User {
  username: string
  usernameJapanese: string
}

class Game {
  name: string
  categories: Array<Category>
}

class Category {
  id: number
  name: string
  type: string
  opponentDtos: Array<Opponent>
}

class Opponent {
  user: User
}

export {
  Submission,
  User
}
