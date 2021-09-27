jest.mock('node-fetch')
import fetch from 'node-fetch'
const { Response } = jest.requireActual('node-fetch')
import { OengusClient } from '../src/lib/oengus-client'
import { Run } from '../src/lib/types/run'
import responses from './data/submissions-response'

describe('OengusClient', () => {
  describe('getRuns', () => {
    it('convert submissions', async () => {
      const eventId = 'eventid'

      const mockFetch = fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockReturnValue(new Response(JSON.stringify(responses[eventId])))

      const client = new OengusClient()

      const runs = await client.getRuns(eventId)
      expect(Array.isArray(runs)).toBe(true)
      runs.forEach(run => {
        expect(run instanceof Run).toBe(true)
      })

      expect(runs[0]).toEqual({
        _id: 1,
        _game: 'Game Title 1',
        _category: 'Category%',
        _type: 'SINGLE',
        _runners: ['Runner 1']
      })
      expect(runs[1]).toEqual({
        _id: 2,
        _game: 'Game Title 2',
        _category: 'Any%',
        _type: 'RACE',
        _runners: ['Runner 2', 'Runner 3']
      })

      expect(mockFetch).toHaveBeenCalledWith('https://oengus.io/api/marathons/eventid/submissions')
    })
    it('get submissions for other events', async () => {
      const eventId = 'eventid2'

      const mockFetch = fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockReturnValue(new Response(JSON.stringify(responses[eventId])))

      const client = new OengusClient()
      const runs = await client.getRuns(eventId)

      expect(runs[0]).toEqual({
        _id: 3,
        _game: 'Game Title 3',
        _category: '100% Coop',
        _type: 'COOP',
        _runners: ['Runner 4', 'Runner 5']
      })

      expect(mockFetch).toHaveBeenCalledWith('https://oengus.io/api/marathons/eventid2/submissions')
    })
  })
})
