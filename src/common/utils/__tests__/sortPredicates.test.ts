import { datesAsc, datesDesc } from '../sortPredicates'

const AFTER_DATE = '2018-04-13T05:39:06-02:00'
const BEFORE_DATE = '2016-05-10T02:12:00-02:00'

describe('Sort predicates test suit', () => {
  it('Sort by Date Desc works well', () => {
    expect(datesDesc(AFTER_DATE, BEFORE_DATE)).toBe(-1)
    expect(datesDesc(BEFORE_DATE, AFTER_DATE)).toBe(1)
    expect(datesDesc(AFTER_DATE, AFTER_DATE)).toBe(0)
  })

  it('Sort by Date Asc works well', () => {
    expect(datesAsc(AFTER_DATE, BEFORE_DATE)).toBe(1)
    expect(datesAsc(BEFORE_DATE, AFTER_DATE)).toBe(-1)
    expect(datesAsc(AFTER_DATE, AFTER_DATE)).toBe(0)
  })
})
