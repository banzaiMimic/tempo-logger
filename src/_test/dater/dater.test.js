const dater = require('../../dater')

test('createDates returned correctly', () => {
  let dates = dater.createDates('2020','10','1','3')
  let expected = [
    '2020-10-01',
    '2020-10-02',
    '2020-10-03'
  ]
  expect( dates.length ).toBe(3)
  expect( dates ).toStrictEqual( expected )
})