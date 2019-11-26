'use strict'
const TagPlatForm = require('../log').TagPlatForm

module.exports.insertOne = function(db, name, doc) {
  const collection = db.collection(name);
  return new Promise((resolve,reject) => {
    collection.insertOne(doc, function(err, result) {
      if (err) {
        TagPlatForm.error(`${err}`)
        reject(err)
      }
      TagPlatForm.info(`Inserted ${JSON.stringify(doc)} document into the ${name} collection`);
      resolve(db)
    });
  })
}

module.exports.find = function(db, name, doc) {
  const collection = db.collection(name);
  return new Promise((resolve,reject) => {
    collection.findOne(doc, function(err, docs) {
      if (err) {
        TagPlatForm.error(`${err}`)
        reject(err)
      }
      TagPlatForm.info(`find the ${JSON.stringify(doc)} in the ${name} collection`);
      resolve(docs)
    });
  })
}

module.exports.deleteOne = function(db, name, doc) {
  const collection = db.collection(name);
  return new Promise((resolve,reject) => {
    collection.deleteOne(doc, function(err, docs) {
      if (err) {
        TagPlatForm.error(`${err}`)
        reject(err)
      }
      TagPlatForm.info(`Delete the ${JSON.stringify(doc)} in the ${name} collection`);
      resolve(docs)
    });
  })
}
