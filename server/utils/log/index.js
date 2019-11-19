'use strict'

// const config = require('../../config')
const winston = require('winston')
const expressWinston = require('express-winston')
const moment = require('moment')
require('winston-daily-rotate-file')
const dateFormat = `${moment().format('YYYY-MM-DD HH:mm:ss:SSS')}`
const TagPlatForm = winston.createLogger({
  transports: [
    // new (winston.transports.DailyRotateFile)({
    //   filename: config.logsPath + '/TagPlatform.log',
    //   level: 'debug',
    //   json: false,
    //   colorize: true,
    //   timestamp: dateFormat,
    //   datePattern: '_yyyy-MM-dd',
    // }),
    new (winston.transports.Console)({
      level: 'debug',
      timestamp: dateFormat,
    })
  ]
})

expressWinston.requestWhitelist.push('body')
expressWinston.responseWhitelist.push('body')

const expressWinstonLogger = expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: false,
      colorize: true,
      timestamp: dateFormat,
    }),
    // new (winston.transports.DailyRotateFile)({
    //   filename: config.logsPath + '/logs/TagPlatform.log',
    //   level: 'debug',
    //   json: false,
    //   colorize: true,
    //   timestamp: dateFormat,
    // })
  ],
  meta: true,
  level: 'info',
  msg: '{{req.method}}-{{res.statusCode}}-[{{req.url}}]-[{{req.reqId}}]-{{req.uid ? ("[" + req.uid + "]") : ""}}-{{res.responseTime}} ms {{" ##query: " + JSON.stringify(req.query) + "##"}}-{{" ## request body: " + JSON.stringify(req.body) + "##"}}-{{" ##response body: " + JSON.stringify(res.body) + "##"}}',
  statusLevels: {
    success: 'info',
    warn: 'warn',
    error: 'error'
  },
  ignoreRoute: (req) => {
    return new RegExp('^/(components|app|bower_component|static)').test(req.url)
  }
})

const expressWinstonErrorLogger = expressWinston.errorLogger({
  transports: [
    new (winston.transports.Console)({
      json: false,
      colorize: true,
      timestamp: dateFormat,
    }),
    // new (winston.transports.File)({
    //   filename: config.logsPath + '/logs/TagPlatform.log',
    //   level: 'debug',
    //   json: false,
    //   colorize: true,
    //   timestamp: dateFormat,
    //   datePattern: '_yyyy-MM-dd',
    // })
  ]
})

exports.TagPlatForm = TagPlatForm
exports.expressWinstonLogger = expressWinstonLogger
exports.expressWinstonErrorLogger = expressWinstonErrorLogger
