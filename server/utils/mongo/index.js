'use strict'
const { TagPlatForm } = require('../log')
const mongoose = require('mongoose');
const { mongo } = require('../../config')
const url = `mongodb://${mongo.userName}:${mongo.password}@${mongo.url}:${mongo.port}/${mongo.db}`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', function(err) { TagPlatForm.error(`[Error] Opening MongoDB Error: ${err}`) });
db.on('connected', function() { TagPlatForm.info(`[Info] MongoDB Conected at ${url}!`) });
db.on('disconnected', function() { TagPlatForm.info(`[Info] MongoDB Disconnected at ${url}!`) });
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userName: { type: String },
  password: { type: String },
  email: { type: String },
  router: { type: Array }
});
const InviteCodeSchema = new Schema({
  code: { type: String },
  role: { type: String },
});
const RoleSchema = new Schema({
  role: { type: String },
  router: { type: Array }
});
const LiveHouseSchema = new Schema({
  userName: { type: String },
  liveHouseName: { type: String },
  status: { type: String },
  time: { type: Number }
});

module.exports.User = mongoose.model('User', UserSchema, 'User');
module.exports.Role = mongoose.model('Role', RoleSchema, 'Role');
module.exports.InviteCode = mongoose.model('InviteCode',InviteCodeSchema, 'InviteCode');
module.exports.LiveHouse = mongoose.model('LiveHouse',LiveHouseSchema, 'LiveHouse');
