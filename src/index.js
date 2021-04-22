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

timeObjects.forEach( async(to) => {
  const { 
    issueKey,
    startDate,
    timeSpentSeconds,
    startTime
  } = to
  await axios.post(`${endpoint}/worklogs/`, 
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
    console.log('err with timeObject:', {
      issueKey: to.issueKey,
      startDate: to.startDate,
      timeSpentSeconds: to.timeSpentSeconds,
      startTime: to.startTime
    })
    console.log({
      message: err.message,
      authorAccountId: process.env.JIRA_ACT_ID
    })
  })
})
