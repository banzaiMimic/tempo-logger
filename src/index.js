const dotenv = require('dotenv').config()
const endpoint = 'https://api.tempo.io/core/3'
const axios = require('axios')
const dater = require('./dater')
const timer = require('./timer')

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

const issues = [
  'RFGW-32',
  'RFGW-31'
]
//september
// const issues = [
//   'CCM-141',
//   'CCM-143',
//   'CCM-139',
//   'CCM-138',
//   'CCM-137',
//   'DEV-4',
//   'ME-667',
//   'ME-12',
//   'ME-673',
//   'RFGW-49'
// ]
//october
// const issues = [
//   'RFGW-77',
//   'RFGW-78',
//   'RFGW-79',
//   'RFGW-76',
//   'RFGW-66',
//   'RFGW-80',
//   'RFGW-85',
//   'CCM-146',
//   'CCM-148',
//   'CCM-149',
//   'CCM-150',
//   'CCM-152',
//   'CCM-153',
//   'CCM-154',
//   'CCM-103',
//   'CCM-155',
//   'CCM-103',
//   'RFGW-87',
//   'RFGW-86',
//   'RFGW-89',
//   'RFGW-90',
//   'RFGW-57',
//   'RFGW-93',
//   'RFGW-95',
//   'RFGW-97',
//   'RFGW-99',
//   'RFGW-100',
//   'RFGW-101',
//   'RFGW-102',
//   'RFGW-103',
//   'RFGW-104',
//   'RFGW-105',
//   'RFGW-98',
//   'RFGW-96',
//   'RFGW-107',
//   'RFGW-108',
//   'RFGW-92',
//   'RFGW-106',
//   'RFGW-91',
//   'DEV-5'
// ]

let dates = dater.createDates('2020','08','1','17')
shuffleArray(issues)
shuffleArray(dates)
let times = timer.createTimes(issues.length, 11, 1)

/*
@Todo
times should be timer.createTimes(dates.length)

times.forEach should grab issueKey at random from issues arr and when
all issues have been posted, keeps grabbing random issues from array
*/

times.forEach( (time,idx) => {
  axios.post(`${endpoint}/worklogs/`, 
  {
    issueKey: issues[idx],
    timeSpentSeconds: time,
    startDate: dates[idx],
    startTime: "06:00:00",
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
