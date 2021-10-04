import { Run } from './run'

export class Page {
  readonly runs: Array<Run>
  readonly no: number

	constructor(runs: Array<Run>, no: number) {
    this.runs = runs
    this.no = no
	}
}
