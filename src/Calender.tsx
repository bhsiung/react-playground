import moment, { calendarFormat, Moment } from 'moment'
import style from './Calender.module.css'

export enum CalenderFormat {
  daily,
  weekly,
  monthly,
}
export interface CalenderGridProps {
  start: Date
  type: CalenderFormat
  events: CalenderEvent[]
}
export interface CalenderEvent {
  name: string
  start: Date
  end: Date
}
export interface EventPosition {
  rowStart: number
  rowEnd: number
  columnStart: number
  columnEnd: number
}

export function CalenderGrid({ start, type, events }: CalenderGridProps) {
  return (
    <>
      {type === CalenderFormat.weekly && (
        <WeeklyGrid start={start} events={events} />
      )}
      {type === CalenderFormat.daily && (
        <div className="container">
          <div className="item item1">1</div>
          <div className="item item2">2</div>
          <div className="item item3">3</div>
          <div className="item item4">4</div>
        </div>
      )}
    </>
  )
}

export function calculatePosition(
  weekDays: Date[]
): (event: CalenderEvent) => EventPosition {
  return (event) => {
    const days = weekDays.map((d) => new Date(d).getDay())
    const theDay = event.start.getDay()
    const column = days.indexOf(theDay)
    // TODO assume start and end at the same day
    // TODO assume we only handle hourly events
    const theStartHour = event.start.getHours()
    const theEndHour = event.end.getHours()
    return {
      rowStart: theStartHour + 1,
      rowEnd: theEndHour + 1,
      columnStart: column + 1,
      columnEnd: column + 2,
    }
  }
}

function formatNumber(num: number): string {
  if (num === 24) return '12 AM'
  let str = ''
  if (num === 0) str += 12
  else if (num > 12) str += num - 12
  else str += num
  if (num < 12) str += ' AM'
  else str += ' PM'
  return str
}
function CalenderPage() {
  return <div></div>
}

function WeeklyGrid({
  start,
  events,
}: {
  start: Date
  events: CalenderEvent[]
}) {
  const dayOfWeek = moment(start).day()
  const firstDateOfWeek = moment(start).add(dayOfWeek * -1, 'days')
  const weekDays: Date[] = []
  const weekDayStrings: string[] = []
  const hours: string[] = []
  // const cells: boolean[] = new Array(50 * 7).fill(false)
  const cells: boolean[] = new Array(168).fill(false)
  for (let i = 0; i < 7; i++) {
    weekDays.push(moment(firstDateOfWeek).add(i, 'days').toDate())
    weekDayStrings.push(
      moment(firstDateOfWeek).add(i, 'days').format('ddd M/D')
    )
  }
  for (let hour = 0; hour <= 24; hour++) {
    hours.push(formatNumber(hour))
  }
  const eventPosition: EventPosition[] = events.map(calculatePosition(weekDays))

  return (
    <section className={style.weeklyContainer}>
      <div className={style.weeklyGrid}>
        {hours.map((hour, index) => (
          <span key={'hour-' + index} className={style.weeklyGridHour}>
            {hour}
          </span>
        ))}
        {weekDayStrings.map((day, index) => (
          <span key={'date-' + index} className={style.weeklyGridDate}>
            {day}
          </span>
        ))}
        <div className={style.weeklyGridBg}>
          {cells.map((v, i) => (
            <div key={'cell-' + i}></div>
          ))}
        </div>
      </div>
      <section className={style.weeklyEvents}>
        {events.map((event, i) => (
          <article
            key={'event-' + i}
            className={style.calenderEvent}
            data-start-date={event.start}
            data-end-date={event.end}
            data-gridRowStart={eventPosition[i].rowStart}
            data-gridRowEnd={eventPosition[i].rowEnd}
            data-gridColumnStart={eventPosition[i].columnStart}
            data-gridColumnEnd={eventPosition[i].columnEnd}
            style={{
              gridRowStart: eventPosition[i].rowStart,
              gridRowEnd: eventPosition[i].rowEnd,
              gridColumnStart: eventPosition[i].columnStart,
              gridColumnEnd: eventPosition[i].columnEnd,
            }}
          >
            <h4>{event.name}</h4>
            <p>
              {moment(event.start).format('HH:mm')} -
              {moment(event.end).format('HH:mm')}
            </p>
          </article>
        ))}
      </section>
    </section>
  )
}

export default CalenderPage
