const dotenv = require('dotenv').config()
const endpoint = 'https://api.tempo.io/core/3'
const axios = require('axios')

axios.post(`${endpoint}/worklogs/`, 
  {
    issueKey: "CCM-103",
    timeSpentSeconds: 3600,
    startDate: "2020-10-01",
    startTime: "06:00:00",
    authorAccountId: "557058:5f3e7d0f-bac4-44db-aa08-766d73ad9ddc",
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.TEMPO_API_TOKEN}`
    }
  })
.then((response) => {
  console.log('response from server: ', response)
})