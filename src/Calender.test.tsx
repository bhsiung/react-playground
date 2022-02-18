import moment from 'moment'
import { calculatePosition, CalenderEvent } from './Calender'

describe('calculatePosition', () => {
  it('can handle single case', () => {
    const weekdays: Date[] = []
    const startDate = moment('1983-09-11T07:00:00.000Z')
    const theEvent: CalenderEvent = {
      name: 'foo1',
      start: new Date('1983-09-15T19:00:00.000Z'),
      end: new Date('1983-09-16T00:00:00.000Z'),
    }
    for (let i = 0; i < 7; i++) {
      weekdays.push(moment(startDate).add(i, 'days').toDate())
    }
    expect(calculatePosition(weekdays)(theEvent)).toEqual({
      rowStart: 13,
      rowEnd: 18,
      columnStart: 5,
      columnEnd: 6,
    })
  })
})
