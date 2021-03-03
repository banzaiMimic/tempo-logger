const dater = require('../../dater')

test('createDates single digit returns correctly', () => {
  let dates = dater.createDates('2020','10','1','3')
  let expected = [
    '2020-10-01',
    '2020-10-02',
    '2020-10-03'
  ]
  expect( dates.length ).toBe(3)
  expect( dates ).toStrictEqual( expected )
})

test('createDates day 0x digits returns correctly', () => {
  let dates = dater.createDates('2020','10','01','03')
  let expected = [
    '2020-10-01',
    '2020-10-02',
    '2020-10-03'
  ]
  expect( dates.length ).toBe(3)
  expect( dates ).toStrictEqual( expected )
})

test('createDates day xx digits returns correctly', () => {
  let dates = dater.createDates('2020','1','10','12')
  let expected = [
    '2020-01-10',
    '2020-01-11',
    '2020-01-12'
  ]
  expect( dates.length ).toBe(3)
  expect( dates ).toStrictEqual( expected )
})

test('createDates month 0x digits returns correctly', () => {
  let dates = dater.createDates('2020','01','10','12')
  let expected = [
    '2020-01-10',
    '2020-01-11',
    '2020-01-12'
  ]
  expect( dates.length ).toBe(3)
  expect( dates ).toStrictEqual( expected )
})

test('createDates maxlength on days', () => {
  try {
    let dates = dater.createDates('2020','10','102','12')
  } catch(e) {
    expect( e.message ).toBe('day max length = 2')
  }
  try {
    let dates = dater.createDates('2020','10','10','122')
  } catch(e) {
    expect( e.message ).toBe('day max length = 2')
  }
})
