/**
 * 生成基础entity代码
 */
const path = require('path')
function firstUpperCase(text) {
  return text ? text.replace(text[0], text[0].toUpperCase()) : ''
}

const EntityTemplate = path.resolve(__dirname, '../templates/entity.hbs')
const EntityPath = 'src/models/entity'

module.exports = {
  description: '生成基础entity代码',
  prompts: [
    {
      type: 'input',
      name: 'fileName',
      message: '请输入Entity的文件名？(遵循驼峰规则例如：shopMenus)'
    },
    {
      type: 'input',
      name: 'name',
      message: '请输入Entity的名字？(遵循大驼峰规则例如：ShopMenus)',
      transformer: name => firstUpperCase(name)
    }
  ],
  actions: [
    {
      type: 'add',
      path: path.join(EntityPath, `{{fileName}}.ts`),
      templateFile: EntityTemplate
    }
  ]
}