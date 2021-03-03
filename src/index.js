const dotenv = require('dotenv').config()
const endpoint = 'https://api.tempo.io/core/3'
const axios = require('axios')
const dater = require('./dater')
const timer = require('./timer')
const { shuffleArray } = require('./utils')

let issues = [
  'issue-A',
  'issue-B',
  'issue-C',
  'issue-D',
  'issue-E',
  'issue-F',
  'issue-G'
]

let dates = dater.createDates('2020','08','1','17')
shuffleArray(issues)
shuffleArray(dates)
const totalHours = 11
const startTime = '06:00:00'

let times = timer.makeTimes({
  dates,
  totalHours,
  issues,
  startTime
})

times.forEach( (time,idx) => {
  console.log('time created:', time)
  // axios.post(`${endpoint}/worklogs/`, 
  // {
  //   issueKey: issues[idx],
  //   timeSpentSeconds: time,
  //   startDate: dates[idx],
  //   startTime: "06:00:00",
  //   authorAccountId: process.env.JIRA_ACT_ID,
  // },
  // { headers: { Authorization: `Bearer ${process.env.TEMPO_API_TOKEN}` }
  // })
  // .then((res) => {
  //   console.log(`status:${res.status} data:${res.config.data}`)
  // })
  // .catch( err => {
  //   console.log(`err on issue ${issues[idx]}`)
  //   console.log({
  //     message: err.message,
  //     time,
  //     startDate: dates[idx],
  //     authorAccountId: process.env.JIRA_ACT_ID
  //   })
  // })
})
