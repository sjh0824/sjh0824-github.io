const fs = require('fs')
const path = require('path')
const express = require('express')
// const jsmediatags = require("jsmediatags")

module.exports = (app) => {
  app.use('/musics', express.static('./server/musics'))
  app.use('/artists', express.static('./server/artists'))

  app.get('/list', (req, res) => {
    fs.readdir(path.resolve(__dirname, './musics/'), (error, files) => {
      if (error || !files.length) {
        return res.jsonp({ message: 'server error' })
      }
      const data = []
      files.forEach(file => {
        const info = file.replace(' - ', '&&&').split('&&&')
        if (info.length == 2) {
          data.push({ title: info[1], artist: info[0], file: file })
        }
        // jsmediatags.read(path.resolve(__dirname, './musics/', file), {
        //   onSuccess: function(tag) {
        //     console.log(tag)
        //   },
        //   onError: function(error) {
        //     console.log(':(', error.type, error.info)
        //   }
        // })
      })

      return res.jsonp(data)
    })
  })
}
