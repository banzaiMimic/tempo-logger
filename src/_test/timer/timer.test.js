const timer = require('../../timer')
const moment = require('moment')

test('spaces time-objects equally from each other by startTime and timeSpentSeconds from 7 issues', () => {
  let issues = [
    'issue-A',
    'issue-B',
    'issue-C',
    'issue-D',
    'issue-E',
    'issue-F',
    'issue-G'
  ]
  let dates = [
    '2020-10-01',
    '2020-10-02',
    '2020-10-03'
  ]
  let startTime = '06:00:00'
  let expectedStart = moment(startTime, 'HH:mm:ss')
  let totalHours = 14

  const timeObjects = timer.makeTimes({
    dates,
    totalHours,
    issues,
    startTime
  })

  timeObjects.map( to => {
    expect(to.startTime).toBe(expectedStart.format('HH:mm:ss'))
    expectedStart.add(to.timeSpentSeconds, 'seconds')
  })

})

test('time-objects timeSpentSeconds add up to within 1 minute of totalHours passed in', () => {
  let issues = [
    'issue-A',
    'issue-B',
    'issue-C'
  ]
  let dates = [
    '2020-10-01',
    '2020-10-02',
    '2020-10-03'
  ]
  let startTime = '06:00:00'
  let totalHours = 14

  const timeObjects = timer.makeTimes({
    dates,
    totalHours,
    issues,
    startTime
  })

  let totalTimeSpentSeconds = 0
  timeObjects.map( to => {
    totalTimeSpentSeconds += to.timeSpentSeconds
  })
  let expectedSeconds = timer.hoursToSeconds(totalHours)
  let difference = expectedSeconds - totalTimeSpentSeconds
  expect(difference).toBeLessThan(60)
})
