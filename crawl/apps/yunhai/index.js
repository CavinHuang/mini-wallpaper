const Axios = require('axios')
const { sign } = require('./util')

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

function getList() {
  const params = {
    search: '221012',
    pageIndex: 1,
    pageSize: 5
  }
  request('query_list', params, true).then(res => {
    console.log(res.data.data)
  }).catch(e => {
    console.log(e) 
  })
}
getList()