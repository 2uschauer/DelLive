'use strict'

const path = require('path')
const _ = require('lodash')

const root = path.normalize(__dirname, '/../..')

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

const all = {
  env: process.env.NODE_ENV,
  root: root,
  mongo: {
    port: 9881,
    url: '127.0.0.1',
    db: 'live',
    userName: 'live',
    password: 'v7f5WQHqkw',
  }
}

const envFile = './' + requiredProcessEnv('NODE_ENV').trim() + '.js'
console.info('env load file path: ', envFile)
module.exports = _.merge(all, require(envFile) || {})
