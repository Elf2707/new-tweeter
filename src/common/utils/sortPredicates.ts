import moment from 'moment'

export function datesAsc(a: string, b: string): number {
  if (moment(a).isSame(b, 'minute')) return 0
  if (moment(a).isBefore(b, 'minute')) return -1
  return 1
}

export function datesDesc(a: string, b: string): number {
  if (moment(a).isSame(b, 'minute')) return 0
  if (moment(a).isBefore(b, 'minute')) return 1
  return -1
}
