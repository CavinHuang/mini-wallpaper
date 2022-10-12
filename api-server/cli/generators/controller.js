/**
 * 生成基础Controller代码
 */
const { readdirSync } = require('fs')
const path = require('path')
const ControllerTemplate = path.resolve(__dirname, '../templates/controller.hbs')
const root = 'src'
const rootPath = path.resolve(__dirname, '../../src')

function getService(moduleName) {
  const serviceDir = path.join(rootPath, moduleName === 'common' ? '' : moduleName, 'service')
  return readdirSync(serviceDir).map(file => path.basename(file).replace(path.extname(file), '').replace(/Service/ig, ''))
}

module.exports = {
  description: '生成基础Controller代码',
  prompts: [
    {
      type: 'list',
      name: 'moduleName',
      choices: ['admin', 'api', 'common'],
      loop: true,
      message: '请选择controller模块'
    },
    {
      type: 'input',
      name: 'name',
      loop: true,
      message: '请输入controller名称'
    },
    {
      type: 'confirm',
      name: 'hasService',
      loop: true,
      message: '是否需要注入service'
    },
    {
      type: 'list',
      choices: getService('admin'),
      name: 'serviceName',
      loop: true,
      message: '请选择注入的Service',
      when: (res) => {
        return res.moduleName === 'admin' && res.hasService
      },
      transformer: (serviceName) => serviceName.replace('Service', '')
    },
    {
      type: 'list',
      choices: getService('api'),
      name: 'serviceName',
      loop: true,
      message: '请选择注入的Service',
      when: (res) => {
        return res.moduleName === 'api' && res.hasService
      },
      transformer: (serviceName) => serviceName.replace('Service', '')
    },
    {
      type: 'list',
      choices: getService('common'),
      name: 'serviceName',
      loop: true,
      message: '请选择注入的Service',
      when: (res) => {
        return res.moduleName === 'common' && res.hasService
      },
      transformer: (serviceName) => serviceName.replace('Service', '')
    }
  ],
  actions: [
    {
      type: 'add',
      path: path.join(root, `{{#ifCond moduleName '==' 'common'}}controller{{else}}{{moduleName}}{{/ifCond}}`,'controller' ,`{{lowercase name}}Controller.ts`),
      templateFile: ControllerTemplate
    }
  ]
}