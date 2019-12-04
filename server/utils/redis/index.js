const redis = require('redis')
const moment = require('moment')
const { promisify } = require('util');
const redisConfig = require('../../config').redis
const { TagPlatForm } = require('../../utils/log')
const dateFormat = `${moment().format('YYYY-MM-DD HH:mm:ss:SSS')}`
const redisSubClientQueue = {}
const redisClient = redis.createClient({
  ...redisConfig,
  retry_strategy: function(options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      return TagPlatForm.error(`${dateFormat} [Error]Opening Redis Error: The Redis server refused the connection`)
    } else if (options.attempt > 10) {
      return undefined
    }
    return Math.mix(options.attempt * 100, 3000)
  }
})

redisClient.on('error', (err) => { TagPlatForm.error(`${dateFormat} [Error]Redis Error: ${err}`) });

redisClient.on('warning', (err) => { TagPlatForm.warn(`${dateFormat} [Warning]Redis Warning: ${err}`) });

redisClient.on('connect', (err) => { TagPlatForm.info(`${dateFormat} [Info]Redis connected: ${err}`) });

redisClient.on('end', (err) => { TagPlatForm.info(`${dateFormat} [Info]Redis disconnected: ${err}`) });

redisClient.on('reconnect', (err) => { TagPlatForm.warn(`${dateFormat} [Info]Redis reconnected: ${err}`) });

const redisSubClient = redisClient.duplicate()

const redisPubClient = redisClient.duplicate()

redisSubClient.register = (channel, fn) => {
  if (!redisSubClientQueue[channel]) redisSubClientQueue[channel] = []
  redisSubClientQueue[channel].push(fn)
  redisSubClient.subscribe(channel)
}

redisSubClient.on('message', (channel, message) => {
  TagPlatForm.info(`${dateFormat} [Info] redisSubClient channel ${channel} receive message : ${message}`)
  const handlers = redisSubClientQueue[channel] || []
  for (let i = 0; i < handlers.length; ++i) {
    if (typeof handlers[i] === 'function') handlers[i](message)
  }
})

const redisGet = promisify(redisClient.get).bind(redisClient);
const redisSet = promisify(redisClient.set).bind(redisClient);
const redisDelete = promisify(redisClient.del).bind(redisClient);
const redisHmset = promisify(redisClient.hmset).bind(redisClient);
const redisHget = promisify(redisClient.hget).bind(redisClient);
const redisHgetall = promisify(redisClient.hgetall).bind(redisClient);
module.exports = {
  redisGet,
  redisSet,
  redisHmset,
  redisHget,
  redisHgetall,
  redisDelete,
  redisSubClient,
  redisPubClient,
}
