/**
 * 生成基础Service代码
 */
const { readdirSync } = require('fs')
const path = require('path')
function firstUpperCase(text) {
  return text ? text.replace(text[0], text[0].toUpperCase()) : ''
}

const ServiceTemplate = path.resolve(__dirname, '../templates/service.hbs')
const root = 'src'
const EntityPath = path.resolve(__dirname, '../../src/models/entity')

function getEntity() {
  return readdirSync(EntityPath).map(file => path.basename(file).replace(path.extname(file), ''))
}

module.exports = {
  description: '生成基础Service代码',
  prompts: [
    {
      type: 'list',
      name: 'moduleName',
      choices: ['admin', 'api', 'common'],
      loop: true,
      message: '请选择service模块'
    },
    {
      type: 'list',
      choices: getEntity(),
      name: 'entityName',
      loop: true,
      message: '请选择注入的entity'
    }
  ],
  actions: [
    {
      type: 'add',
      path: path.join(root, `{{#ifCond moduleName '==' 'common'}}service{{else}}{{moduleName}}{{/ifCond}}`,'service' ,`{{entityName}}Service.ts`),
      templateFile: ServiceTemplate
    }
  ]
}