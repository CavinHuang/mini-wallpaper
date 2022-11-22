const nodeHtmlToImage = require('node-html-to-image')
const path = require('path')
const axios = require('axios')
const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
const { getLatest } = require('./api')

const htmlPath = path.resolve(__dirname, './index.html')
const htmlContent = fs.readFileSync(htmlPath).toString()
const cdnHost = 'http://img.zukmb.cn/'

const config = {
  width: 300,
  height: 600
}

// nodeHtmlToImage({
//   output: './image.png',
//   html: htmlContent,
//   type: 'png',
//   selector: '#container',
//   transparent: true
// })

function addZero(num) {
  return num <= 9 ? '0' + num : num
}

function getToday() {
  const date = new Date()
  return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`
}

function checkDir(number = '') {
  const last = String(number) ? getToday() + '-' + String(number) : getToday()
  const filePath = path.join(__dirname, 'images', last)
  if (fs.existsSync(filePath)) checkDir(number = Number(number || 0) + 1)
  fs.mkdirSync(filePath, {
    recursive: true
  })
  return filePath
}

function downloadImage(url, filePath) {
  axios({
    url,
    responseType: 'stream'
  }).then(res => {
    const writer = fs.createWriteStream(filePath)
    res.data.pipe(writer)
    writer.on('finish', () => {
      console.log('下载：', url + '成功')
    })
  })
}

function compose(image1, image2, savePath) {
  const canvas = createCanvas((config.width * 2) + 20 + 30, config.height + 20)
  const ctx = canvas.getContext('2d')

  if (image1) {
    loadImage(image1).then((image) => {
      ctx.drawImage(image, 10, 10, config.width, config.height)
    })
  }

  if (image2) {
    loadImage(image2).then((image) => {
      ctx.drawImage(image, config.width + 40, 10, config.width, config.height)
    })
  }
  const stream = canvas.createPNGStream()
  const writer = fs.createWriteStream(savePath)
  stream.pipe(writer)
  writer.on('finish', () => {
    console.log('图片合成成功', savePath)
  })
}

getLatest().then(res => {
  if (res.data.success) {
    const data = res.data.data
    console.log(data)
    const filePath = checkDir()
    const content = data.url.map(item => {
      const keys = item.split('/')
      const key = keys[keys.length - 1]
      const url = cdnHost + item
      downloadImage(url, `${filePath}/${key}-1.png`)
      return { backgroundImage:url,  output: `${filePath}/${key}.png`}
    })
    nodeHtmlToImage({
      html: htmlContent,
      content,
      type: 'png',
      selector: '#container',
      transparent: true
    }).then((res) => {
      console.log(res)
      console.log('The image was created successfully!')
      const imageRes = []
      for (let i = 0; i < content.length; i++) {
        const index = i % 2
        if (index === 0) {
          const image1 = content[i] ? content[i].output: ''
          const image2 = content[i + 1] ? content[i + 1].output: ''
          imageRes.push({ image1, image2, filePath: path.dirname(image1) + i + '.png' })
        }
      }
      console.log(imageRes)
      imageRes.forEach(item => {
        compose(item.image1, item.image2, item.filePath)
      })
    })
  }
})