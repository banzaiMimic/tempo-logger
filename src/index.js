const dotenv = require('dotenv').config()
const endpoint = 'https://api.tempo.io/core/3'
const axios = require('axios')
const dater = require('./dater')
const timer = require('./timer')

const issues = [
  'RFGW-77',
  'RFGW-78',
  'RFGW-79',
  'RFGW-76',
  'RFGW-66',
  'RFGW-80',
  'RFGW-85',
  'CCM-146',
  'CCM-148',
  'CCM-149',
  'CCM-150',
  'CCM-152',
  'CCM-153',
  'CCM-154',
  'CCM-103',
  'CCM-155',
  'CCM-103',
  'RFGW-87',
  'RFGW-86',
  'RFGW-89',
  'RFGW-90',
  'RFGW-57',
  'RFGW-93',
  'RFGW-95',
  'RFGW-97',
  'RFGW-99',
  'RFGW-100',
  'RFGW-101',
  'RFGW-102',
  'RFGW-103',
  'RFGW-104',
  'RFGW-105',
  'RFGW-98',
  'RFGW-96',
  'RFGW-107',
  'RFGW-108',
  'RFGW-92',
  'RFGW-106',
  'RFGW-91',
  'DEV-5'
]

let dates = dater.createDates('2020','10','1','31')
let times = timer.createTimes(issues.length, 120, 2)

let promises = [];
times.forEach( (time,idx) => {
  promises.push(
    axios.post(`${endpoint}/worklogs/`, 
    {
      issueKey: time,
      timeSpentSeconds: 3600,
      startDate: dates[idx],
      startTime: "06:00:00",
      authorAccountId: process.env.JIRA_ACT_ID,
    },
    { headers: { Authorization: `Bearer ${process.env.TEMPO_API_TOKEN}` }
    })
  .then((response) => {
    //console.log('response from server: ', response)
  })
  )
})

Promise.all(promises).then(() => console.log('done.'));
