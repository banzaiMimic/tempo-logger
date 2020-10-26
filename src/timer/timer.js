const hoursToSeconds = hours => Math.floor(hours * 60 * 60)
const secondsToHours = seconds => Math.floor(seconds / 3600)

const divvy = (number, parts, min) => {

  const randombit = number - min * parts
  let out = []
  let i = 0
  
  for ( i; i < parts; i++) {
    out.push( Math.random() )
  }
  
  const mult = Math.floor( randombit / out.reduce(function (a,b) {return a+b;}) )
  
  return out.map( el => {
    let ret = Math.floor(el * mult + min)
    return ret; 
  })

}

const createTimes = (entries, totalHours, minDay) => {
  return divvy(hoursToSeconds(totalHours), entries, hoursToSeconds(minDay))
}

module.exports = {
  createTimes,
  hoursToSeconds,
  secondsToHours
}