const { shuffleArray } = require('../utils')
const moment = require('moment')

const hoursToSeconds = hours => Math.floor(hours * 60 * 60)
const secondsToHours = seconds => Math.floor(seconds / 3600)

const divvy = ({seconds, partsInt}) => {

  const randombit = seconds - .5 * partsInt
  let out = []
  let i = 0
  
  for ( i; i < partsInt; i++) {
    out.push( Math.random() )
  }
  
  const mult = Math.floor( randombit / out.reduce(function (a,b) {return a+b;}) )
  
  return out.map( el => {
    let ret = Math.floor(el * mult + .5)
    return ret; 
  })

}

const makeTimes = ({dates, totalHours, issues, startTime}) => {
  const originalIssues = JSON.parse(JSON.stringify(issues))
  const issuesPerDay = 3
  let clonedIssues = JSON.parse(JSON.stringify(originalIssues))
  let returnArr = []
  let fullDivvy = divvy({
    seconds: hoursToSeconds(totalHours),
    partsInt: dates.length
  })
  
  try {
    let start = moment(startTime, "HH:mm:ss")
    dates.map( (date, idx) => {

      clonedIssues = (clonedIssues.length <= 0) ? JSON.parse(JSON.stringify(originalIssues)) : clonedIssues
      shuffleArray(clonedIssues)
      let subIssues = clonedIssues.splice(0,issuesPerDay)
      let subDivvy = divvy({
        seconds: fullDivvy[idx],
        partsInt: subIssues.length
      })
      console.log('subIssues:', subIssues)
      console.log('subDivvy:', subDivvy)
      subIssues.map( (issueKey, idxx) => {
        let timeSpentSeconds = subDivvy[idxx]
        start = (idx === 0) ? start : start.add(timeSpentSeconds, 'seconds')
        returnArr.push({
          issueKey,
          startDate: date,
          timeSpentSeconds,
          startTime: start.format('HH:mm:ss')
        })
      })
    })
  } catch(e) {
    console.error(e)
  }

  return returnArr
}

module.exports = {
  hoursToSeconds,
  secondsToHours,
  divvy,
  makeTimes
}