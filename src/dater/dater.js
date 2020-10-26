const createDates = (year, month, dayStart, dayEnd) => {
  let returnArr = []

  try {
    if (dayStart.charAt(0) == '0') {
      dayStart = dayStart.substring(1, dayStart.length)
    }
    let i = dayStart
    for( i; i <= dayEnd; i++) {
      let day = (i < 10) ? `0${i}` : i
      let m = (month < 10) ? `0${month}` : month
      returnArr.push(`${year}-${month}-${day}`)
    }

  } catch(e) {
    throw new Error(e)
  }

  return returnArr
}

module.exports = { 
  createDates
}