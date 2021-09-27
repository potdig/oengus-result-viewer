import { cyan, green, red, white, yellow } from 'colors'
import { Result } from '../src/lib/types/result'
import { Run } from '../src/lib/types/run'

describe('Result', () => {
  describe('formatted', () => {
    it('format result', () => {
      const run = new Run(1, 'Game', 'Category', 'SINGLE', ['Runner'])
      const result = new Result('VALIDATED', run)
      expect(result.formatted).toBe(`${green.inverse(' ACCEPT ')} ${white(run.formatted)}`)
    })
    it('format each type', () => {
      const run = new Run(1, 'Game', 'Category', 'SINGLE', ['Runner'])
      const reject = new Result('REJECTED', run)
      const backup = new Result('BACKUP', run)
      const bonus = new Result('BONUS', run)

      expect(reject.formatted).toBe(`${red(' REJECT ')} ${white(run.formatted)}`)
      expect(backup.formatted).toBe(`${cyan.inverse(' BACKUP ')} ${white(run.formatted)}`)
      expect(bonus.formatted).toBe(`${yellow.inverse('  BONUS ')} ${white(run.formatted)}`)
    })
  })
})
