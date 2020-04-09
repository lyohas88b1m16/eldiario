const Url = require('url')
const fs = require('fs')

// for static content
function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, {}, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        console.log(`ReadFile ${path} error:`, err)
        reject(JSON.stringify(err))
      }
    })
  })
}

const Router = {
  listen: async function (request) {
    let parsedURL = Url.parse(request.url, true)
    let path = parsedURL.pathname.replace(/^\/+|\/+$/g, '')
    let method = request.method.toUpperCase()
    let query = JSON.stringify(parsedURL.query)

    console.log('method', method)
    console.log('path', path)
    console.log('query', query)

    let answer = {}

    try {
      const data = await readFile(`./app/public/index.html`)

      answer = {
        status: 200,
        type: { 'Content-Type': 'text/html' },
        data,
      }
    } catch (e) {
      console.log(`Exception: ${e}`)
      answer = {
        status: 404,
        type: { 'Content-Type': 'text/html' },
        data: '404 Not Found',
      }
    }

    return answer
  }
}

module.exports = Router