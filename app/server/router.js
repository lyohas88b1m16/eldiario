const Url = require('url')
const fsPromise = require('fs').promises

const Router = {
  places: {
    index: './app/public/index.html',
    notFound: './app/public/404.html'
  },
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
      let content
      switch (path) {
        case '': {
          console.log('index')
          content = await fsPromise.readFile(this.places.index)
          break
        }
        default: {
          content = await fsPromise.readFile(this.places.notFound)
        }
      }

      answer = {
        status: 200,
        type: { 'Content-Type': 'text/html' },
        content,
      }
    } catch (e) {
      console.log(`Exception: ${e}`)
      answer = {
        status: 404,
        type: { 'Content-Type': 'text/html' },
        content: '404 Not Found',
      }
    }

    return answer
  }
}

module.exports = Router