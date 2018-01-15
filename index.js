const {send} = require('micro'),
         fse = require('fs-extra');
//const mime = require('mime')

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
  //url whitelist
  if(url.search('/static/') == 0
  || url.search('/node_modules/') == 0
  || url.search('/index.html') == 0
  || url === '/'){
    //console.log(__dirname+url);
    const cleanurl = (url === '/') ? "/index.html" : url
    try{
      fse.readFile(__dirname + cleanurl).then((staticFile) => {
        //sniffing mime type from 'accept' header?
        const mimeType = req.headers.accept.split(',')[0];
        //console.log(`the mime is: ${mime.getType(__dirname+url)}`)
	if(cleanurl === "/index.html"){
          res.setHeader('Content-Type', 'text/html')
        }else if(mimeType != "*/*"){
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
