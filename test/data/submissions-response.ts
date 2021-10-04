const eventid = [
  {
    id: 1,
    user: {
      id: 1,
      username: 'Runner 1',
      usernameJapanese: ''
    },
    games: [
      {
        id: 1,
        name: 'Game Title 1',
        console: 'PC',
        description: 'desc',
        categories: [
          {
            id: 1,
            name: 'Category%',
            estimate: 'PT20M',
            description: 'desc',
            type: 'SINGLE',
            opponentDtos: []
          }
        ]
      }
    ]
  },
  {
    id: 2,
    user: {
      id: 2,
      username: 'Runner 2',
      usernameJapanese: ''
    },
    games: [
      {
        id: 2,
        name: 'Game Title 2',
        console: 'PC',
        description: 'desc',
        categories: [
          {
            id: 2,
            name: 'Any%',
            estimate: 'PT20M',
            description: 'desc',
            type: 'RACE',
            opponentDtos: [
              {
                id: 1,
                user: {
                  id: 3,
                  username: 'Runner 3',
                  usernameJapanese: ''
                }
              }
            ]
          }
        ]
      }
    ]
  }
]

const eventid2 = [
  {
    id: 3,
    user: {
      id: 4,
      username: 'Runner 4',
      usernameJapanese: ''
    },
    games: [
      {
        id: 3,
        name: 'Game Title 3',
        categories: [
          {
            id: 3,
            name: '100% Coop',
            type: 'COOP',
            opponentDtos: [
              {
                id: 2,
                user: {
                  id: 5,
                  username: 'Runner 5',
                  usernameJapanese: ''
                }
              }
            ]
          }
        ]
      }
    ]
  }
]

export default {
  eventid,
  eventid2
}
