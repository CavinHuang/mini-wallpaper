/*
七牛云配置
*/
const qiniu = require('qiniu')

// 创建上传凭证（accessKey 和 secretKey在七牛云个人中心中有，lytton是七牛云刚才创建的空间名称）
const accessKey = 'cZ3CTJzThiyASoac6GAmoyG244WqGmf_o53z-h4e'
const secretKey = 'fQMA9EWA5R3ECQnMI9JoN8YxzqVIqfEE2BgDoqZe'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: 'cavin-static',
  expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

export {
  uploadToken
}