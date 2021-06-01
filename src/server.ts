import express from 'express'
import 'dotenv/config'

const port = process.env.APP_PORT || 3000
const app = express()

app.get('/', (request, response) => {
  return response.json({ msg: 'Server is ON ...'})
})

app.listen(port, () => console.log(`Server is running on port ${port}. ✌`))