const { entityGenerator, serviceGenerator, controllerGenerator } = require('./cli')

function camelToUnderline(camelStr, division = '_') {
  return camelStr
    .replace(/\s*/g, '')
    .replace(/[A-Z]/g, function (s) {
      return ' ' + s.toLowerCase()
    })
    .trim()
    .replace(/ /g, division)
}

module.exports = function(plop){
  plop.setHelper('firstUppercase', function (text) {
		return text ? text.replace(text[0], text[0].toUpperCase()) : ''
	});
  plop.setHelper('lowercase', function (text) {
		return text ? text.toLowerCase() : ''
	});
  plop.setHelper('camelToUnderline', function (text) {
		return text ? camelToUnderline(text, '-') : ''
  });
  plop.setHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
      case '==':
        return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!=':
        return (v1 != v2) ? options.fn(this) : options.inverse(this);
      case '!==':
        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '<':
        return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=':
        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>':
        return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=':
        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&':
        return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||':
        return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
    }
  });
  plop.setGenerator('entity', entityGenerator)
  plop.setGenerator('service', serviceGenerator)
  plop.setGenerator('controller', controllerGenerator)
}