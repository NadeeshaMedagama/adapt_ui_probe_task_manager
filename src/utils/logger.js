const morgan = require('morgan')

const developmentLogger = morgan('dev')
const productionLogger = morgan('combined')

const logger = process.env.NODE_ENV === 'production'
  ? productionLogger
  : developmentLogger

module.exports = logger
