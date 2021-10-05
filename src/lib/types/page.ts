import { Formattable } from './formattable'

export class Page {
  readonly data: Array<Formattable>
  readonly no: number

	constructor(data: Array<Formattable>, no: number) {
    this.data = data
    this.no = no
	}
}
