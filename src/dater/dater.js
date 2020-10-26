const cleanTwoDigit = day => {
  if (day.length > 2) {
    throw new Error('day max length = 2')
  }
  return (day.charAt(0) == '0') ? day.substring(1, day.length) : day
}

const createDates = (year, month, dayStart, dayEnd) => {
  let returnArr = []

  try {
    month = cleanTwoDigit( month )
    dayStart = cleanTwoDigit( dayStart )
    dayEnd = cleanTwoDigit( dayEnd )
    let i = dayStart
    for( i; i <= dayEnd; i++) {
      let day = (i < 10) ? `0${i}` : i
      let m = (month < 10) ? `0${month}` : month
      returnArr.push(`${year}-${m}-${day}`)
    }

  } catch(e) {
    throw e
  }

  return returnArr
}

module.exports = { 
  createDates
}