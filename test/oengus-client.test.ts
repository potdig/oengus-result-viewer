jest.mock('node-fetch')
import fetch from 'node-fetch'
const { Response } = jest.requireActual('node-fetch')
import { OengusClient } from '../src/lib/oengus-client'
import { Result } from '../src/lib/types/result'
import { Run } from '../src/lib/types/run'
import submissionsResponses from './data/submissions-response'
import selectionsResponses from './data/selections-response'
import { resolve } from 'path'

describe('OengusClient', () => {
  describe('getRunsFromApi', () => {
    it('convert submissions', async () => {
      const eventId = 'eventid'

      const mockFetch = fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockReturnValue(new Response(JSON.stringify(submissionsResponses[eventId])))

      const client = new OengusClient()
      const runs: Array<Run> = await client.getRunsFromApi(eventId)

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
      mockFetch.mockReturnValue(new Response(JSON.stringify(submissionsResponses[eventId])))

      const client = new OengusClient()
      const runs: Array<Run> = await client.getRunsFromApi(eventId)

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
  describe('getRunsFromFile', () => {
    it('convert from JSON file', () => {
      const eventId = 'eventid'

      const client = new OengusClient()
      const runs: Array<Run> = client.getRunsFromFile(resolve(__dirname, 'data/submissions-response.json'))

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
    })
  })
  describe('getResults', () => {
    it('convert from selections', async () => {
      const eventId = 'eventid'

      const mockFetch = fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockReturnValue(new Response(JSON.stringify(selectionsResponses[eventId])))

      const client = new OengusClient()
      const results: Array<Result> = await client.getResults(eventId, [
        new Run(1, 'Game 1', 'Category', 'SINGLE', ['Runner']),
        new Run(2, 'Game 2', 'Category', 'SINGLE', ['Runner'])
      ])

      expect(results[0]).toMatchObject({
        _status: 'VALIDATED',
        _run: {
          _id: 1,
          _game: 'Game 1'
        }
      })
      expect(results[1]).toMatchObject({
        _status: 'REJECTED',
        _run: {
          _id: 2,
          _game: 'Game 2'
        }
      })
    })
    it('get results for other event', async () => {
      const eventId = 'eventid2'

      const mockFetch = fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockReturnValue(new Response(JSON.stringify(selectionsResponses[eventId])))

      const client = new OengusClient()
      const results: Array<Result> = await client.getResults(eventId, [
        new Run(3, 'Game 3', 'Category', 'SINGLE', ['Runner']),
        new Run(4, 'Game 4', 'Category', 'SINGLE', ['Runner'])
      ])

      expect(results[0]).toMatchObject({
        _status: 'BACKUP',
        _run: {
          _id: 3,
          _game: 'Game 3'
        }
      })
      expect(results[1]).toMatchObject({
        _status: 'BONUS',
        _run: {
          _id: 4,
          _game: 'Game 4'
        }
      })
    })
  })
})
