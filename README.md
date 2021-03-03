will use Tempo API v3 to log time to Jira issues

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

### tempo api token
- go to tempo from jira Apps > Tempo
- click settings (cogwheel on left)
- oAuth 2.0 applications
- new application

- setup postman with the following POST : (you will get the $CODE in the next step)

- POST request to: https://api.tempo.io/oauth/token/
with following parameters using the "application/x-www-form-urlencoded" format:
```
   grant_type = authorization_code
   client_id = $CLIENT_ID
   client_secret = $CLIENT_SECRET
   redirect_uri = $REDIRECT_URI
   code = $CODE
```

- get the $CODE parameter : (this expires quickly)
send GET: https://{jira-cloud-instance-name}.atlassian.net/plugins/servlet/ac/io.tempo.jira/oauth-authorize/?client_id=$CLIENT_ID&redirect_uri=$REDIRECT_URI&access_type=tenant_user
you will get a `&code=` in return url

The POST response includes the access token itself, related information, and a refresh token.
```
{
   "access_token":"$ACCESS_TOKEN",
   "expires_in":5184000,
   "token_type":"Bearer",
   "scope":"read write",
   "refresh_token":"$REFRESH_TOKEN"
}
```

### jira account id
to get jira account id click profile icon top right go to PROFILE it will be end number at url https://{jira-cloud-instance-name}.atlassian.net/jira/people/XXXXXX:XXXXXXXXXXXXXXXXX