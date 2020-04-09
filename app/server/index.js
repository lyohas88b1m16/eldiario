const http = require('http')

const Router = require('./router.js')

const port = 1988

// GO!
const Server = http.createServer(async (request, response) => {
  let answer = await Router.listen(request)

  response.writeHead(answer.status, answer.type)
  response.write(answer.data)
  response.end()
})

Server.start = async function() {
  Server.listen(port, () => {
    console.log(`You'll find El Diario on http://localhost:${port}`)
    return true
  })
}

module.exports = Server
