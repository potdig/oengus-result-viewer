import { Category } from '../src/lib/types/category'

describe('Category', () => {
  describe('formattedEst', () => {
    it('format seconds only', () => {
      const category = new Category('Category', 'PT10S', 'desc', 'SINGLE')
      expect(category.formattedEst).toBe('0:00:10')
    })
    it('format minutes only', () => {
      const category = new Category('Category', 'PT30M', 'desc', 'SINGLE')
      expect(category.formattedEst).toBe('0:30:00')
    })
    it('format hours only', () => {
      const category = new Category('Category', 'PT3H', 'desc', 'SINGLE')
      expect(category.formattedEst).toBe('3:00:00')
    })
    it('format hours and minutes', () => {
      const category = new Category('Category', 'PT1H40M20S', 'desc', 'SINGLE')
      expect(category.formattedEst).toBe('1:40:20')
    })
    it('format single digit number', () => {
      const category = new Category('Category', 'PT1H5M5S', 'desc', 'SINGLE')
      expect(category.formattedEst).toBe('1:05:05')
    })
  })
})
