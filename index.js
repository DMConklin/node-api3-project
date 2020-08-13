// code away!
const server = require('./server')

const PORT = process.env.port || 5000

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})

