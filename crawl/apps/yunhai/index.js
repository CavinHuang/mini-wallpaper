const Axios = require('axios')
const { sign } = require('./util')
const { transform, saveResource, sleep } = require('../qiniu')
const path = require('path')
const fs = require('fs')

const clientSecret = 'zMSsJN+oJZgn0IPYopvz9Q=='
const apiUrl = 'https://api.bspapp.com/client'
const spaceId = '22216ea3-8317-4edf-8a69-51a6afb7507e'

const clientInfo = {
  "PLATFORM": "mp-weixin",
  "OS": "ios",
  "APPID": "__UNI__615C2F3",
  "DEVICEID": "16659966027572229425",
  "scene": 1001,
  "windowWidth": 375,
  "windowHeight": 667,
  "deviceOrientation": "portrait",
  "screenWidth": 375,
  "screenHeight": 667,
  "benchmarkLevel": 1,
  "batteryLevel": 100,
  "statusBarHeight": 20,
  "bluetoothEnabled": true,
  "locationEnabled": true,
  "wifiEnabled": true,
  "cameraAuthorized": true,
  "locationAuthorized": true,
  "microphoneAuthorized": true,
  "notificationAuthorized": true,
  "safeArea": {
    "top": 20,
    "left": 0,
    "right": 375,
    "bottom": 667,
    "width": 375,
    "height": 647
  },
  "enableDebug": false,
  "devicePixelRatio": 2,
  "mode": "default",
  "deviceId": "16659966027572229425",
  "safeAreaInsets": {
    "top": 20,
    "left": 0,
    "right": 0,
    "bottom": 0
  },
  "appId": "__UNI__615C2F3",
  "appName": "坚持跑步第二次",
  "appVersion": "2.4.0",
  "appVersionCode": "100",
  "appLanguage": "zh-Hans",
  "uniCompileVersion": "3.5.3",
  "uniRuntimeVersion": "3.5.3",
  "uniPlatform": "mp-weixin",
  "deviceBrand": "devtools",
  "deviceModel": "iPhone 6/7/8",
  "deviceType": "phone",
  "osName": "ios",
  "osVersion": "10.0.1",
  "hostVersion": "8.0.5",
  "hostLanguage": "zh-CN",
  "hostName": "WeChat",
  "hostSDKVersion": "2.27.0",
  "hostFontSizeSetting": 16,
  "windowTop": 0,
  "windowBottom": 0,
  "locale": "zh-Hans",
  "LOCALE": "zh-Hans"
}

const tagMap = [
    {
        "id": 16,
        "name": "赛博"
    },
    {
        "id": 17,
        "name": "聊天背景"
    },
    {
        "id": 2,
        "name": "美女"
    },
    {
        "id": 3,
        "name": "风景"
    },
    {
        "id": 8,
        "name": "小清新"
    },
    {
        "id": 9,
        "name": "动漫"
    },
    {
        "id": 10,
        "name": "沙雕"
    },
    {
        "id": 11,
        "name": "王者荣耀"
    },
    {
        "id": 12,
        "name": "日系动漫"
    },
    {
        "id": 13,
        "name": "和平精英"
    },
    {
        "id": 14,
        "name": "风景"
    },
    {
        "id": 15,
        "name": "景深"
    }
]

const category = 114
const commonTag = 18


async function sqlBuild(item) {
  const { name, tags, images } = item
  const res = await Promise.allSettled(images.map(img => transform(img)))
  const keys = []
  const errorUrls = []

  res.forEach((item, index) => {
    if (item.status === 'fulfilled') {
      keys[index] = item.value 
    } else {
      keys[index] = undefined
      errorUrls.push(images[index])
    }
  })
  
  // let sql = "INSERT INTO `resource` (`appid`, `type` `name`, `info`, `url`, `thumb_url`, `upload_ ype`, `price`, `vip_pr ce`, `sort`, `is_hot`, `is_recom end`, `author`, `create_at`, `update_at`) VALUES ('wx123004cdf793dff7', 'image', '" + name + "', '"+ keys.join(';') +"', '"+ keys[0] +"', 'qiniu', '0', '0', 1, 0, 0, '', '2022-10-19 09:05:41.648519', '2022-10-19 09:05:41.648519');"

  const getTagId = () => {
    return tagMap.filter(_tag => {
      return tags.indexOf(_tag.name) > -1 || name.indexOf(_tag.name) > -1
    })
  }
  const allTag = getTagId()
  const _tags = allTag.length ? allTag.map(item => item.id) : [commonTag]
  const postData = {
    "tags": _tags,
    "price": "0",
    "vip_price": "0",
    "urlType": 1,
    "appid": "wx123004cdf793dff7",
    "categories": 114,
    "name": name,
    "info": name,
    "sort": 1,
    "url": keys,
    "upload_type": "qiniu",
    type: 'image'
  }
  await saveResource(postData)
}

function buildParams(functionTarget, params = {}) {
  const data = {
    functionTarget,
    "functionArgs": {
      "dbName": "wx_cover",
      ...params,
      clientInfo
    }
  }
  return JSON.stringify(data)
}

async function getAccessToken() {
  const data = {
    method: 'serverless.auth.user.anonymousAuthorize',
    params: '{}',
    spaceId,
    timestamp: Date.now(),
  };
  const result = await Axios.post('https://api.bspapp.com/client', JSON.stringify(data)
    ,{
      headers: {
        'Content-Type': 'application/json',
        'x-serverless-sign': sign(data, clientSecret),
      }
    }).then((res) => {
      return res.data
    })
  return result
}

function getXSign(data, params) {
  return sign(data, clientSecret)
}

async function request(functionTarget, params, needToken = true) {
  const options = {
    method: 'serverless.function.runtime.invoke',
    params: buildParams(functionTarget, params),
    spaceId,
    timestamp: Date.now(),
  };
  if (needToken) {
    const token = await getAccessToken()
    if (token.success) {
      options.token = token.data.accessToken
    }
  }
  console.log('请求的参数', options)
  return Axios.post(apiUrl, JSON.stringify(options), {
    headers: {
      ...(needToken ? {'x-basement-token': options.token } : {} ),
      'x-serverless-sign': sign(options, clientSecret),
      'Content-Type': 'application/json',
    }
  })
}
let cache = []
const cacheFilePath = path.resolve(__dirname, 'cache.txt')

if (fs.existsSync(cacheFilePath)) {
  cache = (() => {
    try {
      return JSON.parse(fs.readFileSync(cacheFilePath).toString())
    } catch (e) {
      return []
    }
  })()
}

function cacheFile() {
  fs.writeFileSync(cacheFilePath, JSON.stringify(cache, null, 2))
}


function getList(pageIndex = 1) {
  const params = {
    // search: '221012',
    filter: {
      status: 1,
    },
    order: {
      name: 'time',
      type: 'desc'
    },
    pageIndex,
    pageSize: 5
  }
  request('query_list', params, true).then(async(res) => {
    const data = res.data.data.data || []

    let isCache = false
    for (let i = 0; i < data.length; i++) {
      if (cache.includes(data[i]._id)) {
        isCache = true
        continue
      }
      cache.push(data[i]._id)
      await sqlBuild(data[i])
      await sleep(2)
    }

    if (res.data.data.hasMore && !isCache) {
      pageIndex++
      await sleep(2)
      getList(pageIndex)
      console.log('下一页', pageIndex)
    } else {
      cacheFile()
    }

  }).catch(e => {
    console.log(e) 
  })
}
getList()
