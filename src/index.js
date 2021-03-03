const dotenv = require('dotenv').config()
const endpoint = 'https://api.tempo.io/core/3'
const axios = require('axios')
const timer = require('./timer')
const { shuffleArray } = require('./utils')
let { issues, dates, totalHours, startTime } = require('./config')

shuffleArray(issues)
shuffleArray(dates)

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
    console.log(`err with timeObject ${to}`)
    console.log({
      message: err.message,
      time,
      startDate: dates[idx],
      authorAccountId: process.env.JIRA_ACT_ID
    })
  })
})
