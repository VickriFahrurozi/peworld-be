require('dotenv').config()
const mysql = require('mysql')
const { host, user, password, database } = process.env

const db = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database
})
db.connect((err) => {
  if (err) {
    console.log(err)
  }
  console.log('connected to db mysql')
})

module.exports = db