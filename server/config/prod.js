'use strict'

module.exports = {
  ip: process.env.IP || '0.0.0.0',
  port: 443,
  httpPort: 80,
  logsPath: '/Users/delpro/WorkSpace/DelLive/logs',
  ziker: {
    appIntranetPrefix: 'http://127.0.0.1:7001'
  },
  thirdPartAppInteranetPrefix: 'http://127.0.0.1',
  ceFilePath: '/ce'
}
