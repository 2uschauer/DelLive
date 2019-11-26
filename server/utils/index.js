const logger = require('.//log')
const TagPlatForm = logger.TagPlatForm
const spawn = require('child_process').spawn;
const path = require('path')
const jwt = require('jwt-simple');
const liveServerPath = path.join(__dirname,'../../../livego')
const secret = 'userPassword'
function onData(data) {
  process.stdout.write(data);
}
module.exports.startLive = function() {
  const subProcess = spawn('bash');
  subProcess.on('error', function () {
    TagPlatForm.error('Error error is: ', arguments)
  });
  // 设置消息监听
  subProcess.stdout.on('data', onData);
  subProcess.stderr.on('data', onData);
  subProcess.on('close', (code) => { TagPlatForm.info(`Exit process code：${code}`) }); // 监听进程退出
  // 向子进程发送命令
  subProcess.stdin.write(`cd ${liveServerPath} \n`);
  subProcess.stdin.write('./livego \n');
  return subProcess
}

module.exports.encodePasseord = function(password) {
  return jwt.encode(password, secret , 'HS512')
}
