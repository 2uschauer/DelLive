'use strict'
const md5 = require('blueimp-md5')
const config = require('../../config')
const { LiveHouse } = require('../../utils/mongo')
const createLiveHouse = function(req,res) {
  const params = req.body
  const hash = md5(`/live/${params.liveHouseName}-${params.time}-${config.live.secret}`)
  const data = config.env === 'dev' ? `rtmp://127.0.0.1/live/${params.liveHouseName}?sign=${params.time}-${hash}` : `rtmp://64.64.238.145/live/${params.liveHouseName}?sign=${params.time}-${hash}`
  LiveHouse.findOne({ liveHouseName: params.liveHouseName }).then((doc) => {
    if (!doc) {
      return LiveHouse.bulkWrite([{
        insertOne: {
          document: {
            userName: params.userName,
            liveHouseName: params.liveHouseName,
            status: '下播',
            time: params.time
          }
        }
      }])
    } else {
      if (parseInt(new Date().getTime() / 1000) > parseInt(doc.time)) {
        LiveHouse.remove(doc).then(() => {
          return LiveHouse.bulkWrite([{
            insertOne: {
              document: {
                userName: params.userName,
                liveHouseName: params.liveHouseName,
                status: '下播',
                time: params.time
              }
            }
          }])
        })
      } else {
        const response = {
          responseCode: '000001',
          responseMsg: '已经有直播间存在！请换一个直播间名字谢谢！',
          data: null
        }
        return Promise.reject(response)
      }
    }
  }).then(() => {
    res.json({
      responseCode: '000000',
      responseMsg: '登陆成功',
      data: data
    })
  }).catch((err) => {
    if (err.responseMsg && err.responseCode) res.json(err)
    else console.log(err)
  })
}
const getLiveHouse = function(req, res) {
  LiveHouse.find({}).then((docs) => {
    res.json({
      responseCode: '000000',
      responseMsg: '登陆成功',
      data: docs
    })
  }).catch((err) => {
    if (err.responseMsg && err.responseCode) res.json(err)
    else console.log(err)
  })
}
module.exports = {
  createLiveHouse,
  getLiveHouse
}
