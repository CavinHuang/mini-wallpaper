const axios = require('axios')

const apiHost = 'http://localhost:10089'

function getLatest() {
  return axios.get(apiHost + '/api/content/wallpaper_latest', {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY2NjE0MDc2OSwiZXhwIjoxNjY2MTQ3OTY5fQ.kVwavI9o55G7hk1eBuvwU-6aHCEcbFVcjB1B7ndophg',
      webType: 'cms-admin'
    }
  })
}

module.exports = {
  getLatest
}