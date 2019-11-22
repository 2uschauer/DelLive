'use strict'

const path = require('path')

module.exports = {
  ip: process.env.IP || '0.0.0.0',
  port: 9880,
  httpPort: 9880,
  logsPath: path.resolve(__dirname, '../../logs'),
  ziker: {
    appIntranetPrefix: 'http://127.0.0.1:7001'
  },
  thirdPartAppInteranetPrefix: 'http://127.0.0,1'
}
