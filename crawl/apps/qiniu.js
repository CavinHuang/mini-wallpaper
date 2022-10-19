const axios = require('axios')
const qiniu = require('qiniu')

const apiHost = 'http://localhost:10089'
const accessKey = 'cZ3CTJzThiyASoac6GAmoyG244WqGmf_o53z-h4e'
const secretKey = 'fQMA9EWA5R3ECQnMI9JoN8YxzqVIqfEE2BgDoqZe'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

const uploadUrl = 'https://api-z2.qiniuapi.com/sisyphus/fetch'

function getToken() {
  return http.get('/api/qiniu/token')
}

function createKey() {
  return 'resource/wallpaper/' + Date.now()
}

async function transform(url) {
  const postData = {
    url,
    bucket: 'cavin-static',
    key: createKey()
    // url: qiniu.util.base64ToUrlSafe(qiniu.util.urlsafeBase64Encode(url)),
    // bucket: qiniu.util.base64ToUrlSafe(qiniu.util.urlsafeBase64Encode('cavin-static')),
    // key: qiniu.util.base64ToUrlSafe(qiniu.util.urlsafeBase64Encode(createKey()))
  }  

  try {
    await axios({
      url: uploadUrl,
      data: JSON.stringify(postData),
      method: 'POST',
      headers: {
        Host: 'api-z2.qiniuapi.com',
        Authorization: qiniu.util.generateAccessTokenV2(mac, uploadUrl, 'POST', 'application/json', JSON.stringify(postData)),
        'Content-Type': 'application/json'
      }
    })
    return postData.key
  } catch (e) {
    console.log(e)
    return null
  }
  
}

function saveResource(postData) {
  return axios.post(apiHost + '/admin/resource', postData, {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY2NjE0MDc2OSwiZXhwIjoxNjY2MTQ3OTY5fQ.kVwavI9o55G7hk1eBuvwU-6aHCEcbFVcjB1B7ndophg',
      webType: 'cms-admin'
    }
  })
}

function sleep(wait) {
  return new Promise((resolve) => {
      setTimeout(resolve, wait * 1000)
  })
}

module.exports = {
  sleep,
  transform,
  saveResource
}
// transform('https://vkceyugu.cdn.bspapp.com/VKCEYUGU-22216ea3-8317-4edf-8a69-51a6afb7507e/38f9b601-ddc5-44bd-b4b5-214598594222.jpg')
