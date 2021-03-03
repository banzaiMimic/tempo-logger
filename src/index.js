const dotenv = require('dotenv').config()
const endpoint = 'https://api.tempo.io/core/3'
const axios = require('axios')
const timer = require('./timer')
const { shuffleArray } = require('./utils')
let { issues, dates } = require('./config')

shuffleArray(issues)
shuffleArray(dates)
const totalHours = 11
const startTime = '06:00:00'

let timeObjects = timer.makeTimes({
  dates,
  totalHours,
  issues,
  startTime
})

timeObjects.forEach( to => {
  const { 
    issueKey,
    startDate,
    timeSpentSeconds,
    startTime
  } = to
  axios.post(`${endpoint}/worklogs/`, 
  {
    issueKey,
    timeSpentSeconds,
    startDate,
    startTime,
    authorAccountId: process.env.JIRA_ACT_ID,
  },
  { headers: { Authorization: `Bearer ${process.env.TEMPO_API_TOKEN}` }
  })
  .then((res) => {
    console.log(`status:${res.status} data:${res.config.data}`)
  })
  .catch( err => {
    console.log(`err on issue ${issues[idx]}`)
    console.log({
      message: err.message,
      time,
      startDate: dates[idx],
      authorAccountId: process.env.JIRA_ACT_ID
    })
  })
})
