const {send} = require('micro'),
         fse = require('fs-extra'),
        mime = require('mime-types');

// DIY readFile example
//const fs = require('fs')
//const readFile = (path, opts = 'utf8') =>
//    new Promise((res, rej) => {
//        fs.readFile(path, opts, (err, data) => {
//            if (err) rej(err)
//            else res(data)
//        })
//    })

module.exports = (req, res) => {
  //strip querystring
  const url = req.url.split('?')[0];
  const cleanurl = (url === '/') ? "./index.html" : "."+url
  const mimeType = mime.lookup(cleanurl)
  //url whitelist
  if(url.search('/static/') == 0
  || url.search('/node_modules/') == 0
  || url.search('/index.html') == 0
  || url === '/'){
    try{
      fse.readFile(cleanurl).then((staticFile) => {
        if(mimeType){
          res.setHeader('Content-Type', mimeType)
        }
        send(res, 200, staticFile)
      })
    } catch(err) {
      console.err(err)
      res.setHeader('Content-Type', "text/plain")
      send(res, 404, `404: ${req.url} NotFound`)
    }
  }else{
    res.setHeader('Content-Type', "text/plain")
    send(res, 404, `404: ${req.url} NotFound`)
  }
}
