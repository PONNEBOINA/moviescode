const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const dbpath = path.join(__dirname, 'movieData.db')
let db = null
const app = express()
const intializationserver = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })
  } catch (e) {
    console.log(`DB error:${e.message}`)
  }
}
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})

intializationserver()

app.get('/movies/', async (request, response) => {
  const moviesquery = `
  SELECT
    * 
   FROM
     movie 
     ORDER BY
       movie_id`
  const allmovies = await db.all(moviesquery)
  response.send(allmovies)
})
