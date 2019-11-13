'use strict'

module.exports = {
  ip: process.env.IP || '0.0.0.0',
  port: 9500,
  logsPath: '/var/bzpt/logs/front',
  ziker: {
    appIntranetPrefix: 'http://0.0.0.0'
  },
  thirdPartAppInteranetPrefix: 'http://127.0.0,1'
}