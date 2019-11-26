'use strict'
const TagPlatForm = require('../log').TagPlatForm
module.exports.connectMongo = function() {
  const config = require('../../config')
  const { mongo } = config
  const MongoClient = require('mongodb').MongoClient;
  const url = `mongodb://${mongo.userName}:${mongo.password}@${mongo.url}:${mongo.port}/${mongo.db}`
  return new Promise((resolve,reject) => {
    MongoClient.connect(url, function(err, client) {
      if (err) {
        TagPlatForm.error(`${err}`)
        reject(err)
      }
      const db = client.db(mongo.db);
      resolve(db)
    })
  })
}

module.exports.insertOne = function(db, name, doc) {
  const collection = db.collection(name);
  return new Promise((resolve,reject) => {
    collection.insertOne(doc, function(err, result) {
      if (err) {
        TagPlatForm.error(`${err}`)
        reject(err)
      }
      console.log('Inserted 1 document into the collection');
      resolve(db)
    });
  })
}

module.exports.find = function(db, name,doc) {
  const collection = db.collection(name);
  return new Promise((resolve,reject) => {
    collection.findOne(doc, function(err, docs) {
      if (err) {
        TagPlatForm.error(`${err}`)
        reject(err)
      }
      console.log('find the collection');
      resolve(docs)
    });
  })
}
