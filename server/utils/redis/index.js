const redis = require('redis')
const { promisify } = require('util');
const redisClient = redis.createClient(9882, '127.0.0.1')
const { TagPlatForm } = require('../../utils/log')
redisClient.on('error', (err) => { TagPlatForm.error(`[Error]Opening Redis Error: ${err}`) });
const redisGet = promisify(redisClient.get).bind(redisClient);
const redisSet = promisify(redisClient.set).bind(redisClient);
module.exports = {
  redisGet,
  redisSet
}
