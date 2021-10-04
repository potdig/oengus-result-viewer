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
  description: string
  console: string
  categories: Array<Category>
}

class Category {
  id: number
  name: string
  estimate: string
  description: string
  type: string
  opponentDtos: Array<Opponent>
}

class Opponent {
  user: User
}

class Selection {
  categoryId: number
  status: string
}

export {
  Submission,
  User,
  Selection
}
