import { Run } from '../src/lib/types/run'

describe('Run', () => {
  describe('formatted', () => {
    it('format', () => {
      const run = new Run(1, 'Game', 'Category%', 'SINGLE', ['Runner'])
      expect(run.formatted).toBe('Game / Category% (Single Run) / Runner')
    })
    it('format multiple runners', () => {
      const run = new Run(1, 'Game 2', 'Any%', 'SINGLE', ['Runner 1', 'Runner 2', 'Runner 3', 'Runner 4'])
      expect(run.formatted).toBe('Game 2 / Any% (Single Run) / Runner 1, Runner 2, Runner 3, Runner 4')
    })
  })
})
