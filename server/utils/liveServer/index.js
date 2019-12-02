const NodeMediaServer = require('node-media-server');
const moment = require('moment')
const { LiveHouse } = require('../mongo')
const { TagPlatForm } = require('../log')
const config = require('../../config')
const dateFormat = `${moment().format('YYYY-MM-DD HH:mm:ss:SSS')}`
const liveConfig = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 7001,
    allow_origin: '*'
  },
  auth: {
    play: false,
    publish: true,
    secret: config.live.secret
  }
};

const nms = new NodeMediaServer(liveConfig)
nms.on('prePublish', (id, StreamPath, args) => {
  const liveHouseName = StreamPath.split('/')[2]
  LiveHouse.updateOne({ liveHouseName: liveHouseName },{ status: '上播' }, function(err) {
    TagPlatForm.error(`${dateFormat} [Error] Opening MongoDB Error: ${err}`)
  })
});

nms.on('donePublish', (id, StreamPath, args) => {
  const liveHouseName = StreamPath.split('/')[2]
  LiveHouse.updateOne({ liveHouseName: liveHouseName },{ status: '下播' }, function(err) {
    TagPlatForm.error(`${dateFormat} [Error] Opening MongoDB Error: ${err}`)
  })
});
module.exports.liveServer = nms
