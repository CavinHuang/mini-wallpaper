import logUpdate from 'log-update'

import symbolLogUpdate from './LogUpdateSymbol'
import symbolLogDone from './LogDoneSymbol'

const consoleLog = console.log.bind(console)
const consoleError = console.error.bind(console)

const configureConsole = function (config) {
  return function (event) {
    let symbolLog
    if (event.data[0] === symbolLogUpdate || event.data[0] === symbolLogDone) {
      symbolLog = event.data.shift()
    }

    const [logFinal, logError, lengthError] = config.handle(event, config.isHightlight)

    if (symbolLog === symbolLogUpdate) {
      logUpdate(logFinal)
    } else if (symbolLog === symbolLogDone) {
      logUpdate(logFinal)
      logUpdate.done()
    } else {
      consoleLog(logFinal)
    }

    if (lengthError) {
      consoleError(logError)
    }
  }
}
export default configureConsole
