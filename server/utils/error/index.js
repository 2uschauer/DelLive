'use strict'

module.exports[404] = function pageNotFound(req, res) {
  const viewFilePath = '404'
  const statusCode = 404
  const result = {
    status: statusCode
  }
  res.status(result.statusCode)
  res.render(viewFilePath, {}, function(err, html) {
    if (err) {
      return res.json(result,result.status)
    }

    res.send(html)
  })
}
