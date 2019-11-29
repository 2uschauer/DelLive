// const { TagPlatForm } = require('./log')
// const spawn = require('child_process').spawn;
// const path = require('path')
// const liveServerPath = path.join(__dirname,'../../../livego')
const jwt = require('jwt-simple');

const encodePasseord = function(password) {
  return jwt.encode(password, 'userPassword' , 'HS512')
}
const getToken = function(userName) {
  return jwt.encode(userName, 'DieLive' , 'HS512')
}
const getUserName = function(userName) {
  return jwt.decode(userName, 'DieLive' , 'HS512')
}
module.exports = {
  encodePasseord,
  getToken,
  getUserName
}
// function onData(data) {
//   process.stdout.write(data);
// }
// module.exports.startLive = function() {
//   const subProcess = spawn('bash');
//   subProcess.on('error', function () {
//     TagPlatForm.error('[Error] Start Live Service Error, ', arguments)
//   });
//   // 设置消息监听
//   subProcess.stdout.on('data', onData);
//   subProcess.stderr.on('data', onData);
//   subProcess.on('close', (code) => { TagPlatForm.info(`Exit process code：${code}`) }); // 监听进程退出
//   // 向子进程发送命令
//   subProcess.stdin.write(`cd ${liveServerPath} \n`);
//   subProcess.stdin.write('./livego \n');
//   return subProcess
// }

// app.use('/restart/live', function(req, res) {
//   try {
//     process.kill(subProcess.pid + 1, 'SIGKILL')
//     process.kill(subProcess.pid, 'SIGKILL')
//     subProcess = startLive()
//     res.json({
//       responseCode: '000000',
//       responseMsg: '重启成功',
//       data: null
//     })
//   } catch (err) {
//     res.json({
//       responseCode: '000001',
//       responseMsg: `${err}`,
//       data: null
//     })
//   }
// })
