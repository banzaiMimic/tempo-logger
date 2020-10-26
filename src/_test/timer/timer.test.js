const { TestScheduler } = require('jest')
const timer = require('../../timer')

const getDifferenceInSeconds = (days, hours, min) => {
  let times = timer.createTimes(days,hours,min)
  let expectedTotalSecs = timer.hoursToSeconds(hours)
  let totalSecs = times.reduce((a,b) => (a+b))
  return expectedTotalSecs - totalSecs
}

const minDiff = 60

test('createTimes | 160 over 31 days', () => {
  expect( getDifferenceInSeconds(31,160,1) ).toBeLessThan( minDiff )
})

test('createTimes | 120 over 31 days', () => {
  expect( getDifferenceInSeconds(31,120,1) ).toBeLessThan( minDiff )
})

test('createTimes | 80 over 31 days', () => {
  expect( getDifferenceInSeconds(31,80,1) ).toBeLessThan( minDiff )
})

test('createTimes | 80 over 14 days', () => {
  expect( getDifferenceInSeconds(14,80,1) ).toBeLessThan( minDiff )
})

test('createTimes | 80 over 7 days', () => {
  expect( getDifferenceInSeconds(7,80,1) ).toBeLessThan( minDiff )
})

test('createTimes | 40 over 7 days', () => {
  expect( getDifferenceInSeconds(7,40,1) ).toBeLessThan( minDiff )
})