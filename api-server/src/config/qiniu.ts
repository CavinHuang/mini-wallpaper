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

var config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2; // 华南

var bucketManager = new qiniu.rs.BucketManager(mac, config);

const uploadToken = () => {
  return putPolicy.uploadToken(mac)
}

const deleteFile = (keys = [], bucket = 'cavin-static') => {
  var deleteOperations = [];
  keys.forEach(key => {
    deleteOperations.push(
      qiniu.rs.deleteOp(bucket, key),
    )
  })
  return new Promise((resolve,reject) => {
    bucketManager.batch(deleteOperations, function(err, respBody, respInfo) {
      if (err) {
        console.log(err);
        reject(err)
      } else {

        if (parseInt((Number(respInfo.statusCode) / 100).toString()) == 2) {
          respBody.forEach(function(item) {
            if (item.code == 200) {
              console.log(item.code + "\tsuccess");
            } else {
              console.log(item.code + "\t" + item.data.error);
            }
          });
        } else {
          console.log(respInfo.deleteusCode);
          console.log(respBody);
        }
        resolve(respBody)
        console.log(respBody,respInfo) // 最后还是res.end
      }
    });
  })
}

export {
  uploadToken,
  deleteFile
}