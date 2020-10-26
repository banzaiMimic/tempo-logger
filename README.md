ref: https://tempo-io.github.io/tempo-api-docs/

### dater
```
/*
  dater.createDates('YYYY','MM',dayStart,dayEnd)
  returns array of tempo-formatted dates :

  dater.createDates('2020','10','1','31')
  //returns:
  [
    '2020-10-01',
    '2020-10-02',
    ...
  ]
*/
```

### timer
```
/*
  timer.createTimes(entries, totalHours, minDay)
  returns array of times (in seconds) randomized with minimum of ${minDay} to equal a sum of within 1 minute of ${totalHours} :

  timer.createTimes(days,hours,min)
  //returns:
  [
    27439, 19581, 35979, 9921, 31311, 15561, 4204
  ]
*/
```