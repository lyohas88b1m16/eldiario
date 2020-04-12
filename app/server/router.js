const Url = require('url')
const fsPromise = require('fs').promises

const Router = {
  places: {
    index: './app/public/index.html',
    notFound: './app/public/404.html'
  },
  listen: async function (request) {
    const parsedURL = Url.parse(request.url, true)
    const path = parsedURL.pathname.replace(/^\/+|\/+$/g, '')
    const method = request.method.toLowerCase()
    const query = JSON.stringify(parsedURL.query)

    let answer = {}
    try {
      answer = await this[method](path, query)
    } catch (e) {
      console.log(`Exception: ${e}`)
      answer = {
        status: 404,
        type: { 'Content-Type': 'text/html' },
        content: '404 Not Found',
      }
    }

    return answer
  },
  get: async function(path, query) {
    console.log('get', path, query)
    
    let answer = {}

    switch (path) {
      case '': {
        console.log('index')

        answer.content = await fsPromise.readFile(this.places.index)
        answer.status = 200
        break
      }
      default: {
        answer.content = await fsPromise.readFile(this.places.notFound)
        answer.status = 404
      }
    }
    
    answer.type = { 'Content-Type': 'text/html' }

    return answer
  },
  post: async function(path, query) {
    console.log('post', path, query)
    let answer = {
      status: 404,
      type: { 'Content-Type': 'text/html' },
      content: '404 Not Found',
    }

    return answer
  },
}

module.exports = Router