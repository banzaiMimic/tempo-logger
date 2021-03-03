const dater = require('../dater')

let issues = [
  'issue-A',
  'issue-B',
  'issue-C',
  'issue-D',
  'issue-E',
  'issue-F',
  'issue-G'
]
//createDates : year, MM, D (day start i.e. 1), DD (day end i.e. 17)
let dates = dater.createDates('2021','01','1','17')
const totalHours = 11
const startTime = '06:00:00'

module.exports = {
  issues,
  dates,
  totalHours,
  startTime
}