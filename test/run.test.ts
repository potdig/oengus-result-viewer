import { Category } from '../src/lib/types/category'
import { Game } from '../src/lib/types/game'
import { Run } from '../src/lib/types/run'

describe('Run', () => {
  describe('formatted', () => {
    it('format', () => {
      const run = new Run(
        1,
        new Game('Game', 'PC', 'desc'),
        new Category('Category%', 'PT20M', 'desc', 'SINGLE'),
        ['Runner']
      )
      expect(run.formatted).toBe('Game / Category% (Single Run) / Runner')
    })
    it('format multiple runners', () => {
      const run = new Run(
        1,
        new Game('Game 2', 'PC', 'desc'),
        new Category('Any%', 'PT20M', 'desc', 'RACE'),
        ['Runner 1', 'Runner 2', 'Runner 3', 'Runner 4']
      )
      expect(run.formatted).toBe(
        'Game 2 / Any% (Race) / Runner 1, Runner 2, Runner 3, Runner 4'
      )
    })
  })
})
