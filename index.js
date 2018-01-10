const {send} = require('micro'),
         fse = require('fs-extra');

// DIY readFile example
//const fs = require('fs')
//const readFile = (path, opts = 'utf8') =>
//    new Promise((res, rej) => {
//        fs.readFile(path, opts, (err, data) => {
//            if (err) rej(err)
//            else res(data)
//        })
//    })

module.exports = async (req, res) => {
  //strip querystring
  const url = req.url.split('?')[0];
  if(url.search('/static/') == 0 || url.search('/node_modules/') == 0){
    try{
      const staticFile = await fse.readFile(__dirname + url)
      //sniffing mime type from 'accept' header?
      const mimeType = req.headers.accept.split(',')[0];
      if(mimeType != "*/*"){
        res.setHeader('Content-Type', mimeType)
      }
      send(res, 200, staticFile)
    } catch(err) {
      res.setHeader('Content-Type', "text/html")
      send(res, 404, `404: ${req.url} NotFound`)
    }
  }else if(url == "/" || url == "/index.html"){
    const indexHtml = await fse.readFile(__dirname + '/index.html')
    res.setHeader('Content-Type', "text/html")
    send(res, 200, indexHtml);
  }else{
    res.setHeader('Content-Type', "text/html")
    send(res, 404, `404: ${req.url} NotFound`)
  }
}
