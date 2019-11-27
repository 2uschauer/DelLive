'use strict'
const TagPlatForm = require('../log').TagPlatForm
const mongoose = require('mongoose');
const { mongo } = require('../../config')
const url = `mongodb://${mongo.userName}:${mongo.password}@${mongo.url}:${mongo.port}/${mongo.db}`
mongoose.connect(url, { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', function(err) { TagPlatForm.error(`${err}`) });
db.on('connected', function() { TagPlatForm.info(`mongodb conected at ${url}!`) });
db.on('disconnected', function() { TagPlatForm.info(`mongodb conected at ${url}!`) });
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

module.exports.User = mongoose.model('User', UserSchema, 'User');
module.exports.Role = mongoose.model('Role', RoleSchema, 'Role');
module.exports.InviteCode = mongoose.model('InviteCode',InviteCodeSchema, 'InviteCode');
